import { NextResponse } from "next/server";
import { assertInternalGeotabJob } from "@/modules/fleet/integrations/geotab/internal-job-auth";
import {
  assertAllowedGeotabFeedType,
  getGeotabSyncService,
} from "@/modules/fleet/integrations/geotab/runtime";

type RouteContext = {
  params: Promise<{ typeName: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    assertInternalGeotabJob(request);
    const { typeName } = await context.params;
    assertAllowedGeotabFeedType(typeName);

    const results = await getGeotabSyncService().drainFeed<unknown>(typeName, {
      maxBatches: 20,
    });
    return NextResponse.json({ typeName, batches: results }, { status: 200 });
  } catch (error) {
    const code = error instanceof Error ? error.message : "GEOTAB_FEED_SYNC_FAILED";
    const status = code.includes("UNAUTHORIZED")
      ? 401
      : code.includes("NOT_ALLOWED")
        ? 400
        : code.includes("NOT_CONFIGURED")
          ? 503
          : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
