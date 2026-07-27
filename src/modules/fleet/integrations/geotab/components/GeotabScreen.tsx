import type { GeotabScreenDefinition } from "../screens";

type GeotabScreenProps = {
  definition: GeotabScreenDefinition;
  status?: "ready" | "not-configured" | "degraded";
};

export function GeotabScreen({
  definition,
  status = "not-configured",
}: GeotabScreenProps) {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <header className="border-b border-red-900/60 bg-black/70 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-red-500">
              ORVEX FUNDACIÓN DR · {definition.pageId}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{definition.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-300">{definition.purpose}</p>
          </div>
          <div
            className="rounded-full border border-red-700/70 bg-red-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-200"
            data-status={status}
          >
            {status}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-5">
        {definition.metrics.map((metric) => (
          <article
            key={metric}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 shadow-lg shadow-black/30"
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">{metric}</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-100">—</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-8 lg:grid-cols-2">
        {definition.sections.map((section, index) => (
          <article
            key={section}
            className={`rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-5 ${
              index === 0 ? "min-h-80 lg:col-span-2" : "min-h-52"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{section}</h2>
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.85)]" />
            </div>
            <div className="mt-5 flex min-h-32 items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 text-sm text-zinc-500">
              {definition.pageId}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
