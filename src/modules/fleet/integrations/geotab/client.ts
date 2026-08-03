import { geotabFeedResultsLimit } from "./feed-limits";
import type {
  FleetTelematicsProvider,
  GeotabCredentials,
  GeotabDevice,
  GeotabDeviceStatusInfo,
  GeotabFeedResult,
  GeotabLoginResult,
  GeotabProviderHealth,
  NormalizedVehicleTelemetry,
} from "./types";

type JsonRpcSuccess<T> = { id: number; result: T };
type JsonRpcFailure = {
  id: number;
  error: {
    code?: number;
    message?: string;
    name?: string;
    data?: unknown;
  };
};

type JsonRpcResponse<T> = JsonRpcSuccess<T> | JsonRpcFailure;

export class GeotabConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeotabConfigurationError";
  }
}

export class GeotabApiError extends Error {
  readonly code: number | null;
  readonly apiName: string | null;

  constructor(message: string, code?: number, apiName?: string) {
    super(message);
    this.name = "GeotabApiError";
    this.code = code ?? null;
    this.apiName = apiName ?? null;
  }
}

export type GeotabClientConfig = {
  server: string;
  database?: string;
  userName: string;
  password: string;
  requestTimeoutMs: number;
  now?: () => Date;
};

export function geotabConfigFromEnv(
  env: NodeJS.ProcessEnv = process.env,
): GeotabClientConfig {
  const userName = env.GEOTAB_USERNAME?.trim();
  const password = env.GEOTAB_PASSWORD;

  if (!userName || !password) {
    throw new GeotabConfigurationError(
      "GEOTAB_USERNAME and GEOTAB_PASSWORD must be configured in the runtime secret store.",
    );
  }

  const timeout = Number(env.GEOTAB_REQUEST_TIMEOUT_MS ?? "30000");
  if (!Number.isFinite(timeout) || timeout < 1_000 || timeout > 180_000) {
    throw new GeotabConfigurationError(
      "GEOTAB_REQUEST_TIMEOUT_MS must be between 1000 and 180000.",
    );
  }

  return {
    server: normalizeHost(env.GEOTAB_SERVER ?? "my.geotab.com"),
    database: env.GEOTAB_DATABASE?.trim() || undefined,
    userName,
    password,
    requestTimeoutMs: timeout,
  };
}

function normalizeHost(value: string): string {
  const trimmed = value.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  if (!trimmed || trimmed.includes("/") || trimmed.includes("@")) {
    throw new GeotabConfigurationError("GEOTAB_SERVER must be a hostname only.");
  }
  return trimmed;
}

function isFailure<T>(response: JsonRpcResponse<T>): response is JsonRpcFailure {
  return "error" in response;
}

function freshnessFor(
  observedAt: string,
  communicating: boolean,
  now: Date,
): NormalizedVehicleTelemetry["freshness"] {
  if (!communicating) return "offline";

  const ageMs = now.getTime() - new Date(observedAt).getTime();
  if (!Number.isFinite(ageMs) || ageMs < 0) return "delayed";
  if (ageMs <= 2 * 60_000) return "fresh";
  if (ageMs <= 15 * 60_000) return "delayed";
  return "stale";
}

export function normalizeDeviceStatus(
  record: GeotabDeviceStatusInfo,
  now = new Date(),
): NormalizedVehicleTelemetry {
  const communicating = record.isDeviceCommunicating !== false;

  return {
    provider: "geotab",
    externalDeviceId: record.device.id,
    observedAt: record.dateTime,
    receivedAt: now.toISOString(),
    latitude: record.latitude,
    longitude: record.longitude,
    speedKph: typeof record.speed === "number" ? record.speed : null,
    headingDegrees: typeof record.bearing === "number" ? record.bearing : null,
    // DeviceStatusInfo exposes driving state, not a definitive ignition value.
    // Ignition is populated later from supported StatusData diagnostics.
    ignitionOn: null,
    isDriving: typeof record.isDriving === "boolean" ? record.isDriving : null,
    isCommunicating: communicating,
    driverExternalId: record.driver?.id ?? null,
    freshness: freshnessFor(record.dateTime, communicating, now),
    activeExceptionExternalIds: (record.exceptionEvents ?? []).map((event) => event.id),
    rawVersion: null,
  };
}

export class GeotabClient implements FleetTelematicsProvider {
  private credentials: GeotabCredentials | null = null;
  private activeServer: string;
  private requestId = 0;
  private readonly now: () => Date;

  constructor(private readonly config: GeotabClientConfig) {
    this.activeServer = normalizeHost(config.server);
    this.now = config.now ?? (() => new Date());
  }

  async authenticate(): Promise<GeotabLoginResult> {
    const result = await this.rawCall<GeotabLoginResult>(
      this.activeServer,
      "Authenticate",
      {
        userName: this.config.userName,
        password: this.config.password,
        ...(this.config.database ? { database: this.config.database } : {}),
      },
    );

    this.credentials = result.credentials;
    if (result.path && result.path !== "ThisServer") {
      this.activeServer = normalizeHost(result.path);
    }

    return result;
  }

  async call<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    if (!this.credentials) await this.authenticate();

    try {
      return await this.rawCall<T>(this.activeServer, method, {
        ...params,
        credentials: this.credentials,
      });
    } catch (error) {
      if (
        error instanceof GeotabApiError &&
        ["InvalidUserException", "SessionExpiredException"].includes(error.apiName ?? "")
      ) {
        this.credentials = null;
        await this.authenticate();
        return this.rawCall<T>(this.activeServer, method, {
          ...params,
          credentials: this.credentials,
        });
      }
      throw error;
    }
  }

  async health(): Promise<GeotabProviderHealth> {
    const startedAt = Date.now();
    try {
      await this.authenticate();
      await this.call<string>("GetVersion");
      return {
        configured: true,
        authenticated: true,
        server: this.activeServer,
        database: this.credentials?.database ?? this.config.database ?? null,
        checkedAt: this.now().toISOString(),
        latencyMs: Date.now() - startedAt,
        errorCode: null,
      };
    } catch (error) {
      return {
        configured: !(error instanceof GeotabConfigurationError),
        authenticated: false,
        server: this.activeServer,
        database: this.config.database ?? null,
        checkedAt: this.now().toISOString(),
        latencyMs: Date.now() - startedAt,
        errorCode:
          error instanceof GeotabApiError
            ? error.apiName ?? "GEOTAB_API_ERROR"
            : error instanceof GeotabConfigurationError
              ? "GEOTAB_NOT_CONFIGURED"
              : "GEOTAB_CONNECTION_FAILED",
      };
    }
  }

  async listDevices(): Promise<GeotabDevice[]> {
    return this.call<GeotabDevice[]>("Get", {
      typeName: "Device",
      resultsLimit: 5_000,
    });
  }

  async getCurrentStatus(): Promise<NormalizedVehicleTelemetry[]> {
    const records = await this.call<GeotabDeviceStatusInfo[]>("Get", {
      typeName: "DeviceStatusInfo",
      resultsLimit: 50_000,
    });
    const now = this.now();
    return records.map((record) => normalizeDeviceStatus(record, now));
  }

  async getFeed<T>(
    typeName: string,
    fromVersion?: string,
  ): Promise<GeotabFeedResult<T>> {
    return this.call<GeotabFeedResult<T>>("GetFeed", {
      typeName,
      resultsLimit: geotabFeedResultsLimit(typeName),
      ...(fromVersion !== undefined ? { fromVersion } : {}),
    });
  }

  private async rawCall<T>(
    server: string,
    method: string,
    params: Record<string, unknown>,
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);

    try {
      const response = await fetch(`https://${server}/apiv1`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: ++this.requestId,
          method,
          params,
        }),
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new GeotabApiError(`MyGeotab returned HTTP ${response.status}.`);
      }

      const payload = (await response.json()) as JsonRpcResponse<T>;
      if (isFailure(payload)) {
        throw new GeotabApiError(
          payload.error.message ?? "MyGeotab API request failed.",
          payload.error.code,
          payload.error.name,
        );
      }

      return payload.result;
    } catch (error) {
      if (error instanceof GeotabApiError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new GeotabApiError("MyGeotab request timed out.", undefined, "Timeout");
      }
      throw new GeotabApiError("Unable to reach MyGeotab.");
    } finally {
      clearTimeout(timeout);
    }
  }
}
