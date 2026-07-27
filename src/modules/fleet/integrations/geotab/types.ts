export type GeotabCredentials = {
  database: string;
  sessionId: string;
  userName: string;
};

export type GeotabLoginResult = {
  credentials: GeotabCredentials;
  path: string;
};

export type GeotabEntityReference = {
  id: string;
};

export type GeotabDevice = {
  id: string;
  name?: string;
  serialNumber?: string;
  vehicleIdentificationNumber?: string;
  licensePlate?: string;
  groups?: GeotabEntityReference[];
};

export type GeotabDeviceStatusInfo = {
  id: string;
  dateTime: string;
  device: GeotabEntityReference;
  driver?: GeotabEntityReference;
  latitude: number;
  longitude: number;
  bearing?: number;
  speed?: number;
  isDriving?: boolean;
  isDeviceCommunicating?: boolean;
  currentStateDuration?: string;
  groups?: GeotabEntityReference[];
  exceptionEvents?: Array<{ id: string }>;
};

export type GeotabFeedResult<T> = {
  data: T[];
  toVersion: string;
};

export type FleetTelemetryFreshness = "fresh" | "delayed" | "stale" | "offline";

export type NormalizedVehicleTelemetry = {
  provider: "geotab";
  externalDeviceId: string;
  observedAt: string;
  receivedAt: string;
  latitude: number;
  longitude: number;
  speedKph: number | null;
  headingDegrees: number | null;
  ignitionOn: boolean | null;
  isDriving: boolean | null;
  isCommunicating: boolean;
  driverExternalId: string | null;
  freshness: FleetTelemetryFreshness;
  activeExceptionExternalIds: string[];
  rawVersion: string | null;
};

export type FleetTelemetryAlertType =
  | "DEVICE_OFFLINE"
  | "STALE_LOCATION"
  | "UNAUTHORIZED_MOVEMENT"
  | "AFTER_HOURS_IGNITION"
  | "GEOFENCE_EXIT"
  | "POWER_LOSS"
  | "TOWING_SUSPECTED"
  | "EXCESSIVE_SPEED"
  | "PROLONGED_IDLE"
  | "DIAGNOSTIC_FAULT"
  | "SERVICE_OVERDUE";

export type FleetTelemetryAlert = {
  type: FleetTelemetryAlertType;
  severity: "info" | "warning" | "critical";
  externalDeviceId: string;
  occurredAt: string;
  details: Record<string, string | number | boolean | null>;
};

export type GeotabProviderHealth = {
  configured: boolean;
  authenticated: boolean;
  server: string;
  database: string | null;
  checkedAt: string;
  latencyMs: number | null;
  errorCode: string | null;
};

export type FleetTelematicsProvider = {
  health(): Promise<GeotabProviderHealth>;
  listDevices(): Promise<GeotabDevice[]>;
  getCurrentStatus(): Promise<NormalizedVehicleTelemetry[]>;
  getFeed<T>(typeName: string, fromVersion?: string): Promise<GeotabFeedResult<T>>;
};

export type GeotabPersistencePort = {
  saveCurrentTelemetry(records: NormalizedVehicleTelemetry[]): Promise<void>;
  saveAlerts(alerts: FleetTelemetryAlert[]): Promise<void>;
  getFeedCursor(typeName: string): Promise<string | null>;
  saveFeedCursor(typeName: string, toVersion: string): Promise<void>;
  processFeedBatch<T>(typeName: string, records: T[]): Promise<void>;
  recordSyncRun(input: {
    typeName: string;
    startedAt: string;
    completedAt: string;
    recordCount: number;
    toVersion: string;
  }): Promise<void>;
};