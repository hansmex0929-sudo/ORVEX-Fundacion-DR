import { GeotabScreen } from "@/modules/fleet/integrations/geotab/components/GeotabScreen";
import { resolveGeotabLocale } from "@/modules/fleet/integrations/geotab/locale";
import { getGeotabScreen } from "@/modules/fleet/integrations/geotab/screens";

type PageProps = {
  params: Promise<{ vehicleId: string }>;
  searchParams?: Promise<{ lang?: string | string[] }>;
};

export default async function VehicleTelematicsPage({
  params,
  searchParams,
}: PageProps) {
  await params;
  const query = searchParams ? await searchParams : {};
  const definition = getGeotabScreen(
    "vehicleDetail",
    resolveGeotabLocale(query.lang),
  );
  return <GeotabScreen definition={definition} />;
}
