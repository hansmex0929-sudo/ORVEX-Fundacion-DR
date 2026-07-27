import { NextResponse } from "next/server";
import { authorizeGeotabRequest } from "@/modules/fleet/integrations/geotab/authorization";
import { getGeotabReadModelPort } from "@/modules/fleet/integrations/geotab/read-model";

export async function GET(request: Request) {
  try {
    const context = await authorizeGeotabRequest(
      request,
      "fleet.telematics.read",
      "fleet.current-telemetry",
    );
    const records = await getGeotabReadModelPort().listCurrentTelemetry(context);
    return NextResponse.json(records, {
      status: 200,
      headers: { "cache-control": "private, no-store" },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "GEOTAB_TELEMETRY_FAILED";
    const status = code.includes("NOT_CONFIGURED") ? 503 : 403;
    return NextResponse.json({ error: code }, { status });
  }
}
