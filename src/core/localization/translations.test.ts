import { describe, expect, it } from "vitest";
import { translations } from "./translations";

describe("bilingual screen translations", () => {
  it("keeps Spanish and English key sets identical", () => {
    expect(Object.keys(translations.en).sort()).toEqual(Object.keys(translations.es).sort());
  });

  it("provides non-empty labels for every visible screen string", () => {
    for (const locale of ["es", "en"] as const) {
      for (const value of Object.values(translations[locale])) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("translates representative table, form, activity, and planner labels", () => {
    expect(translations.en.nameRecord).toBe("Name / Record");
    expect(translations.en.saveDraft).toBe("Save draft");
    expect(translations.en.recentActivity).toBe("Recent activity");
    expect(translations.en.plannedRoutes).toBe("Planned routes");
  });
});
