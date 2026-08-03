import { NextResponse } from "next/server";
import { authorizeGeotabRequest } from "@/modules/fleet/integrations/geotab/authorization";
import { toGeotabHttpError } from "@/modules/fleet/integrations/geotab/http-error";
import { getGeotabReadModelPort } from "@/modules/fleet/integrations/geotab/read-model";

const PRIVATE_JSON_HEADERS = {
  "cache-control": "private, no-store",
  "x-content-type-options": "nosniff",
};

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
      headers: PRIVATE_JSON_HEADERS,
    });
  } catch (error) {
    const failure = toGeotabHttpError(error, "GEOTAB_TELEMETRY_FAILED");
    return NextResponse.json(
      { error: failure.code },
      { status: failure.status, headers: PRIVATE_JSON_HEADERS },
    );
  }
}
