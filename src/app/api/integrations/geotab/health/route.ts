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
      "fleet.integrations.manage",
      "geotab.provider-health",
    );
    const health = await getGeotabReadModelPort().getProviderHealth(context);
    return NextResponse.json(health, {
      status: 200,
      headers: PRIVATE_JSON_HEADERS,
    });
  } catch (error) {
    const failure = toGeotabHttpError(error, "GEOTAB_HEALTH_FAILED");
    return NextResponse.json(
      { error: failure.code },
      { status: failure.status, headers: PRIVATE_JSON_HEADERS },
    );
  }
}
