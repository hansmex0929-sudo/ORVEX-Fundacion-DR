import { GeotabScreen } from "@/modules/fleet/integrations/geotab/components/GeotabScreen";
import { resolveGeotabLocale } from "@/modules/fleet/integrations/geotab/locale";
import { getGeotabScreen } from "@/modules/fleet/integrations/geotab/screens";

type PageProps = {
  searchParams?: Promise<{ lang?: string | string[] }>;
};

export default async function FleetCommandCenterPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const definition = getGeotabScreen(
    "commandCenter",
    resolveGeotabLocale(params.lang),
  );

  return <GeotabScreen definition={definition} />;
}
