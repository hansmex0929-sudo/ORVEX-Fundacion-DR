"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  GeotabProviderHealth,
  NormalizedVehicleTelemetry,
} from "./types";

type LoadState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

function useJsonResource<T>(url: string, enabled = true): LoadState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(enabled);

  const refresh = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
        headers: { accept: "application/json" },
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? `Request failed with ${response.status}.`);
      }

      setData((await response.json()) as T);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load fleet data.");
    } finally {
      setLoading(false);
    }
  }, [enabled, url]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, error, loading, refresh };
}

export function useGeotabHealth(enabled = true): LoadState<GeotabProviderHealth> {
  return useJsonResource<GeotabProviderHealth>(
    "/api/integrations/geotab/health",
    enabled,
  );
}

export function useFleetTelemetry(
  enabled = true,
): LoadState<NormalizedVehicleTelemetry[]> {
  return useJsonResource<NormalizedVehicleTelemetry[]>(
    "/api/integrations/geotab/telemetry",
    enabled,
  );
}
