export type Permission =
  | "executive.read" | "identity.read" | "household.read" | "assessment.read"
  | "case.read" | "assistance.request" | "assistance.approve" | "inventory.receive"
  | "delivery.plan" | "delivery.complete" | "volunteer.manage" | "compliance.read"
  | "ai.review" | "admin.configuration";

export type SessionUser = { id: string; name: string; permissions: Permission[] };

export const syntheticSession: SessionUser = {
  id: "usr_demo_executive",
  name: "Ana Rodríguez",
  permissions: [
    "executive.read", "identity.read", "household.read", "assessment.read", "case.read",
    "assistance.request", "assistance.approve", "inventory.receive", "delivery.plan",
    "delivery.complete", "volunteer.manage", "compliance.read", "ai.review",
  ],
};

export function hasPermission(user: SessionUser, required: Permission) {
  return user.permissions.includes(required);
}

export async function authorize(required: Permission, user = syntheticSession) {
  if (!hasPermission(user, required)) throw new Error("UNAUTHORIZED");
  return user;
}
