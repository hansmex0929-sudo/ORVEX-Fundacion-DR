export type GeotabPermission =
  | "fleet.telematics.read"
  | "fleet.telematics.history.read"
  | "fleet.alerts.manage"
  | "fleet.geofences.manage"
  | "fleet.integrations.manage"
  | "fleet.theft.manage";

export type GeotabAuthorizationContext = {
  tenantId: string;
  userId: string;
  regionIds: string[];
};

export type GeotabAuthorizationPort = {
  assertPermission(
    request: Request,
    permission: GeotabPermission,
  ): Promise<GeotabAuthorizationContext>;
  recordSensitiveAccess(input: {
    context: GeotabAuthorizationContext;
    permission: GeotabPermission;
    resource: string;
    occurredAt: string;
  }): Promise<void>;
};

let authorizationPort: GeotabAuthorizationPort | null = null;

export function registerGeotabAuthorizationPort(
  port: GeotabAuthorizationPort,
): void {
  authorizationPort = port;
}

export async function authorizeGeotabRequest(
  request: Request,
  permission: GeotabPermission,
  resource: string,
): Promise<GeotabAuthorizationContext> {
  if (!authorizationPort) {
    throw new Error("GEOTAB_AUTHORIZATION_NOT_CONFIGURED");
  }

  const context = await authorizationPort.assertPermission(request, permission);
  await authorizationPort.recordSensitiveAccess({
    context,
    permission,
    resource,
    occurredAt: new Date().toISOString(),
  });
  return context;
}
