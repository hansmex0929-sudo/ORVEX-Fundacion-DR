import type {
  GeotabProviderHealth,
  NormalizedVehicleTelemetry,
} from "./types";

export type GeotabReadScope = {
  tenantId: string;
  userId: string;
  regionIds: string[];
};

export type GeotabReadModelPort = {
  getProviderHealth(scope: GeotabReadScope): Promise<GeotabProviderHealth>;
  listCurrentTelemetry(scope: GeotabReadScope): Promise<NormalizedVehicleTelemetry[]>;
};

let readModelPort: GeotabReadModelPort | null = null;

export function registerGeotabReadModelPort(port: GeotabReadModelPort): void {
  readModelPort = port;
}

export function getGeotabReadModelPort(): GeotabReadModelPort {
  if (!readModelPort) {
    throw new Error("GEOTAB_READ_MODEL_NOT_CONFIGURED");
  }
  return readModelPort;
}
