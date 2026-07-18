import { describe,expect,it } from "vitest";
import { getScreen,screens } from "./registry";

describe("screen registry",()=>{
  it("registers the priority screens plus person and household intake",()=>expect(screens.filter((screen)=>screen.highFidelity)).toHaveLength(22));
  it("assigns permission and bilingual labels to every route",()=>{for(const screen of screens){expect(screen.permission).toBeTruthy();expect(screen.title.es).toBeTruthy();expect(screen.title.en).toBeTruthy()}});
  it("resolves approved screen slugs",()=>expect(getScreen("exe-010")?.id).toBe("EXE-010"));
  it("promotes intake actions to functional form shells",()=>{expect(getScreen("idn-021")?.kind).toBe("form");expect(getScreen("fam-031")?.kind).toBe("form")});
});
