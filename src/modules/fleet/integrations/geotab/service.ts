import { geotabFeedResultsLimit } from "./feed-limits";
import type {
  FleetTelemetryAlert,
  FleetTelematicsProvider,
  GeotabPersistencePort,
  NormalizedVehicleTelemetry,
} from "./types";

export type GeotabSyncResult = {
  typeName: string;
  recordCount: number;
  fromVersion: string | null;
  toVersion: string;
  caughtUp: boolean;
};

export type FleetAlertPolicy = {
  staleAfterMinutes: number;
  excessiveSpeedKph: number;
};

const DEFAULT_POLICY: FleetAlertPolicy = {
  staleAfterMinutes: 15,
  excessiveSpeedKph: 120,
};

export function deriveTelemetryAlerts(
  records: NormalizedVehicleTelemetry[],
  policy: FleetAlertPolicy = DEFAULT_POLICY,
): FleetTelemetryAlert[] {
  const alerts: FleetTelemetryAlert[] = [];

  for (const record of records) {
    if (!record.isCommunicating || record.freshness === "offline") {
      alerts.push({
        type: "DEVICE_OFFLINE",
        severity: "critical",
        externalDeviceId: record.externalDeviceId,
        occurredAt: record.observedAt,
        details: { freshness: record.freshness },
      });
      continue;
    }

    if (record.freshness === "stale") {
      alerts.push({
        type: "STALE_LOCATION",
        severity: "warning",
        externalDeviceId: record.externalDeviceId,
        occurredAt: record.observedAt,
        details: { staleAfterMinutes: policy.staleAfterMinutes },
      });
    }

    if ((record.speedKph ?? 0) > policy.excessiveSpeedKph) {
      alerts.push({
        type: "EXCESSIVE_SPEED",
        severity: "warning",
        externalDeviceId: record.externalDeviceId,
        occurredAt: record.observedAt,
        details: {
          speedKph: record.speedKph,
          thresholdKph: policy.excessiveSpeedKph,
        },
      });
    }
  }

  return alerts;
}

export class GeotabFleetSyncService {
  constructor(
    private readonly provider: FleetTelematicsProvider,
    private readonly persistence: GeotabPersistencePort,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async syncCurrentStatus(): Promise<{
    recordCount: number;
    alertCount: number;
  }> {
    const records = await this.provider.getCurrentStatus();
    const alerts = deriveTelemetryAlerts(records);

    await this.persistence.saveCurrentTelemetry(records);
    if (alerts.length > 0) await this.persistence.saveAlerts(alerts);

    return { recordCount: records.length, alertCount: alerts.length };
  }

  async syncFeed<T>(typeName: string): Promise<GeotabSyncResult> {
    const startedAt = this.now().toISOString();
    const fromVersion = await this.persistence.getFeedCursor(typeName);
    const result = await this.provider.getFeed<T>(typeName, fromVersion ?? undefined);

    const staged = await this.persistence.stageFeedBatch({
      typeName,
      fromVersion,
      toVersion: result.toVersion,
      records: result.data,
      stagedAt: this.now().toISOString(),
    });

    await this.persistence.processStagedFeedBatch(staged.batchId);
    const completedAt = this.now().toISOString();
    await this.persistence.completeFeedBatch(staged.batchId, completedAt);
    await this.persistence.recordSyncRun({
      typeName,
      startedAt,
      completedAt,
      recordCount: result.data.length,
      toVersion: result.toVersion,
    });

    return {
      typeName,
      recordCount: result.data.length,
      fromVersion,
      toVersion: result.toVersion,
      caughtUp: result.data.length < geotabFeedResultsLimit(typeName),
    };
  }

  async drainFeed<T>(
    typeName: string,
    options: { maxBatches?: number } = {},
  ): Promise<GeotabSyncResult[]> {
    const maxBatches = Math.max(1, Math.min(options.maxBatches ?? 20, 100));
    const results: GeotabSyncResult[] = [];

    for (let batch = 0; batch < maxBatches; batch += 1) {
      const result = await this.syncFeed<T>(typeName);
      results.push(result);
      if (result.caughtUp) break;
    }

    return results;
  }
}
