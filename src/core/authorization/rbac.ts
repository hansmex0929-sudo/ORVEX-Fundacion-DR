export const permissionScopes=["identity.read","identity.write","household.read","household.write","audit.read"] as const;
export type PermissionScope=typeof permissionScopes[number];
export type AuthContext={userId:string;tenantId:string;permissions:ReadonlySet<PermissionScope>};
export class AuthorizationError extends Error{constructor(public readonly scope:PermissionScope){super(`Permission required: ${scope}`);this.name="AuthorizationError"}}
export function requirePermission(context:AuthContext,scope:PermissionScope){if(!context.permissions.has(scope))throw new AuthorizationError(scope);return context}
