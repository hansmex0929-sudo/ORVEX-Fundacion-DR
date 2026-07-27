import { NextResponse } from "next/server";
import { assertInternalGeotabJob } from "@/modules/fleet/integrations/geotab/internal-job-auth";
import { getGeotabSyncService } from "@/modules/fleet/integrations/geotab/runtime";

export async function POST(request: Request) {
  try {
    assertInternalGeotabJob(request);
    const result = await getGeotabSyncService().syncCurrentStatus();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const code = error instanceof Error ? error.message : "GEOTAB_STATUS_SYNC_FAILED";
    const status = code.includes("UNAUTHORIZED") ? 401 : code.includes("NOT_CONFIGURED") ? 503 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
