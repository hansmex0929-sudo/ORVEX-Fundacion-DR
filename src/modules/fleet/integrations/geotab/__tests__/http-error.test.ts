import { describe, expect, it } from "vitest";
import { toGeotabHttpError } from "../http-error";

describe("toGeotabHttpError", () => {
  it.each([
    ["GEOTAB_UNAUTHORIZED", 401],
    ["FLEET_PERMISSION_DENIED", 403],
    ["GEOTAB_AUTHORIZATION_NOT_CONFIGURED", 503],
    ["GEOTAB_READ_MODEL_NOT_CONFIGURED", 503],
    ["GEOTAB_PROVIDER_TIMEOUT", 503],
    ["GEOTAB_DATABASE_UNAVAILABLE", 503],
    ["GEOTAB_INVALID_REQUEST", 400],
    ["GEOTAB_NOT_ALLOWED", 400],
    ["GEOTAB_UNEXPECTED_FAILURE", 500],
  ] as const)("maps %s to HTTP %s", (code, status) => {
    expect(toGeotabHttpError(new Error(code), "GEOTAB_FAILED")).toEqual({
      code,
      status,
    });
  });

  it("does not expose raw provider or database exception text", () => {
    expect(
      toGeotabHttpError(
        new Error("connection failed for postgres://user:secret@internal-db"),
        "GEOTAB_TELEMETRY_FAILED",
      ),
    ).toEqual({
      code: "GEOTAB_TELEMETRY_FAILED",
      status: 500,
    });
  });

  it("uses the stable fallback for non-Error failures", () => {
    expect(toGeotabHttpError({ password: "secret" }, "GEOTAB_HEALTH_FAILED")).toEqual({
      code: "GEOTAB_HEALTH_FAILED",
      status: 500,
    });
  });
});
