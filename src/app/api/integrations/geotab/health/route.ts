import { NextResponse } from "next/server";
import { authorizeGeotabRequest } from "@/modules/fleet/integrations/geotab/authorization";
import { getGeotabReadModelPort } from "@/modules/fleet/integrations/geotab/read-model";

export async function GET(request: Request) {
  try {
    const context = await authorizeGeotabRequest(
      request,
      "fleet.integrations.manage",
      "geotab.provider-health",
    );
    const health = await getGeotabReadModelPort().getProviderHealth(context);
    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    const code = error instanceof Error ? error.message : "GEOTAB_HEALTH_FAILED";
    const status = code.includes("NOT_CONFIGURED") ? 503 : 403;
    return NextResponse.json({ error: code }, { status });
  }
}
