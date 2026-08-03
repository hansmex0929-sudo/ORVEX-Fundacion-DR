import { describe, expect, it } from "vitest";
import { geotabFeedResultsLimit } from "../feed-limits";
import { GeotabFleetSyncService } from "../service";
import type {
  FleetTelematicsProvider,
  GeotabPersistencePort,
} from "../types";

function createService(batchSizes: number[]): GeotabFleetSyncService {
  let batchIndex = 0;

  const provider: FleetTelematicsProvider = {
    health: async () => ({
      configured: true,
      authenticated: true,
      server: "my.geotab.com",
      database: "synthetic",
      checkedAt: "2026-08-03T20:00:00.000Z",
      latencyMs: 1,
      errorCode: null,
    }),
    listDevices: async () => [],
    getCurrentStatus: async () => [],
    getFeed: async <T>() => {
      const recordCount = batchSizes[batchIndex] ?? 0;
      batchIndex += 1;

      return {
        data: Array.from(
          { length: recordCount },
          (_, index) => ({ index }) as unknown as T,
        ),
        toVersion: `version-${batchIndex}`,
      };
    },
  };

  const persistence: GeotabPersistencePort = {
    saveCurrentTelemetry: async () => undefined,
    saveAlerts: async () => undefined,
    getFeedCursor: async () => null,
    stageFeedBatch: async (input) => ({
      batchId: `batch-${input.toVersion}`,
      typeName: input.typeName,
      fromVersion: input.fromVersion,
      toVersion: input.toVersion,
      recordCount: input.records.length,
    }),
    processStagedFeedBatch: async () => undefined,
    completeFeedBatch: async () => undefined,
    recordSyncRun: async () => undefined,
  };

  return new GeotabFleetSyncService(
    provider,
    persistence,
    () => new Date("2026-08-03T20:00:00.000Z"),
  );
}

describe("Geotab feed pagination", () => {
  it("uses the configured MyGeotab result limit for each feed family", () => {
    expect(geotabFeedResultsLimit("Device")).toBe(5_000);
    expect(geotabFeedResultsLimit("User")).toBe(5_000);
    expect(geotabFeedResultsLimit("Zone")).toBe(10_000);
    expect(geotabFeedResultsLimit("Trip")).toBe(10_000);
    expect(geotabFeedResultsLimit("Route")).toBe(10_000);
    expect(geotabFeedResultsLimit("LogRecord")).toBe(50_000);
  });

  it("continues draining feeds when the provider returns a full type-specific batch", async () => {
    const cases = [
      { typeName: "Device", fullBatchSize: 5_000 },
      { typeName: "Zone", fullBatchSize: 10_000 },
    ] as const;

    for (const { typeName, fullBatchSize } of cases) {
      const service = createService([fullBatchSize, 1]);

      const results = await service.drainFeed(typeName);

      expect(results).toHaveLength(2);
      expect(results[0]).toMatchObject({
        typeName,
        recordCount: fullBatchSize,
        caughtUp: false,
      });
      expect(results[1]).toMatchObject({
        typeName,
        recordCount: 1,
        caughtUp: true,
      });
    }
  });

  it("stops after a partial Device batch", async () => {
    const service = createService([4_999, 1]);

    const results = await service.drainFeed("Device");

    expect(results).toHaveLength(1);
    expect(results[0].caughtUp).toBe(true);
  });
});
