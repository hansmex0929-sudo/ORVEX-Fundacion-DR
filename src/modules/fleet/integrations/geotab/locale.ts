import type { SupportedLocale } from "./screens";

const supported: SupportedLocale[] = ["es", "en", "ht", "fr"];

export function resolveGeotabLocale(value: unknown): SupportedLocale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return typeof candidate === "string" && supported.includes(candidate as SupportedLocale)
    ? (candidate as SupportedLocale)
    : "es";
}
