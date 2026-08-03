const FIVE_THOUSAND_RECORD_FEEDS = new Set(["Device", "User"]);
const TEN_THOUSAND_RECORD_FEEDS = new Set(["Zone", "Trip", "Route"]);

/**
 * Returns the exact MyGeotab GetFeed resultsLimit used for a feed family.
 * The sync service must use this same value to decide whether another page
 * may exist; keeping both call sites on one function prevents silent drift.
 */
export function geotabFeedResultsLimit(typeName: string): number {
  if (FIVE_THOUSAND_RECORD_FEEDS.has(typeName)) return 5_000;
  if (TEN_THOUSAND_RECORD_FEEDS.has(typeName)) return 10_000;
  return 50_000;
}
