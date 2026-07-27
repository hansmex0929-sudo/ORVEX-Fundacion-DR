import type { GeotabFleetSyncService } from "./service";

let syncService: GeotabFleetSyncService | null = null;

export function registerGeotabSyncService(service: GeotabFleetSyncService): void {
  syncService = service;
}

export function getGeotabSyncService(): GeotabFleetSyncService {
  if (!syncService) {
    throw new Error("GEOTAB_SYNC_SERVICE_NOT_CONFIGURED");
  }
  return syncService;
}

const allowedFeedTypes = new Set([
  "Device",
  "DriverChange",
  "ExceptionEvent",
  "FaultData",
  "LogRecord",
  "StatusData",
  "Trip",
  "User",
  "Zone",
]);

export function assertAllowedGeotabFeedType(typeName: string): void {
  if (!allowedFeedTypes.has(typeName)) {
    throw new Error("GEOTAB_FEED_TYPE_NOT_ALLOWED");
  }
}
