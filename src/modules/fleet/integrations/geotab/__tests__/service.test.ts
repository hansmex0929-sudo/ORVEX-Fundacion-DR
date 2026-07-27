import { describe, expect, it } from "vitest";
import { normalizeDeviceStatus } from "../client";
import { deriveTelemetryAlerts } from "../service";

const now = new Date("2026-07-27T16:00:00.000Z");

describe("normalizeDeviceStatus", () => {
  it("marks non-communicating devices offline without inventing ignition state", () => {
    const result = normalizeDeviceStatus(
      {
        id: "status-1",
        dateTime: "2026-07-27T15:59:00.000Z",
        device: { id: "device-1" },
        latitude: 18.4861,
        longitude: -69.9312,
        speed: 0,
        isDriving: false,
        isDeviceCommunicating: false,
      },
      now,
    );

    expect(result.freshness).toBe("offline");
    expect(result.ignitionOn).toBeNull();
    expect(result.isDriving).toBe(false);
  });

  it("marks recent communicating records fresh", () => {
    const result = normalizeDeviceStatus(
      {
        id: "status-2",
        dateTime: "2026-07-27T15:59:30.000Z",
        device: { id: "device-2" },
        latitude: 19.4517,
        longitude: -70.697,
        speed: 42,
        isDriving: true,
        isDeviceCommunicating: true,
      },
      now,
    );

    expect(result.freshness).toBe("fresh");
    expect(result.speedKph).toBe(42);
  });
});

describe("deriveTelemetryAlerts", () => {
  it("creates critical offline and warning speed alerts", () => {
    const records = [
      {
        provider: "geotab" as const,
        externalDeviceId: "offline",
        observedAt: now.toISOString(),
        receivedAt: now.toISOString(),
        latitude: 0,
        longitude: 0,
        speedKph: null,
        headingDegrees: null,
        ignitionOn: null,
        isDriving: null,
        isCommunicating: false,
        driverExternalId: null,
        freshness: "offline" as const,
        activeExceptionExternalIds: [],
        rawVersion: null,
      },
      {
        provider: "geotab" as const,
        externalDeviceId: "speeding",
        observedAt: now.toISOString(),
        receivedAt: now.toISOString(),
        latitude: 0,
        longitude: 0,
        speedKph: 130,
        headingDegrees: null,
        ignitionOn: null,
        isDriving: true,
        isCommunicating: true,
        driverExternalId: null,
        freshness: "fresh" as const,
        activeExceptionExternalIds: [],
        rawVersion: null,
      },
    ];

    const alerts = deriveTelemetryAlerts(records);
    expect(alerts.map((alert) => alert.type)).toEqual([
      "DEVICE_OFFLINE",
      "EXCESSIVE_SPEED",
    ]);
  });
});
