import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { assertInternalGeotabJob } from "../internal-job-auth";

const TOKEN_ENV = "ORVEX_INTERNAL_JOB_TOKEN";
let priorToken: string | undefined;

function requestWithAuthorization(value?: string): Request {
  return new Request("https://orvex.invalid/api/internal/jobs/geotab/status", {
    method: "POST",
    headers: value ? { authorization: value } : undefined,
  });
}

describe("assertInternalGeotabJob", () => {
  beforeEach(() => {
    priorToken = process.env[TOKEN_ENV];
    process.env[TOKEN_ENV] = "synthetic-internal-token";
  });

  afterEach(() => {
    if (priorToken === undefined) {
      delete process.env[TOKEN_ENV];
    } else {
      process.env[TOKEN_ENV] = priorToken;
    }
  });

  it.each([
    "Bearer synthetic-internal-token",
    "bearer synthetic-internal-token",
    "BEARER synthetic-internal-token",
    "Bearer   synthetic-internal-token",
    "Bearer\tsynthetic-internal-token",
    "Bearer synthetic-internal-token   ",
  ])("accepts a valid case-insensitive Bearer scheme: %s", (authorization) => {
    expect(() => assertInternalGeotabJob(requestWithAuthorization(authorization))).not.toThrow();
  });

  it.each([
    undefined,
    "Basic synthetic-internal-token",
    "Bearer",
    "Bearer wrong-token",
    "Bearer synthetic-internal-token extra",
  ])("rejects malformed or incorrect authorization: %s", (authorization) => {
    expect(() => assertInternalGeotabJob(requestWithAuthorization(authorization))).toThrow(
      "INTERNAL_JOB_UNAUTHORIZED",
    );
  });

  it("fails closed when the internal token is not configured", () => {
    delete process.env[TOKEN_ENV];

    expect(() =>
      assertInternalGeotabJob(
        requestWithAuthorization("Bearer synthetic-internal-token"),
      ),
    ).toThrow("INTERNAL_JOB_TOKEN_NOT_CONFIGURED");
  });
});
