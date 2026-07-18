import { describe,expect,it } from "vitest";
import { getScreen,screens } from "./registry";

describe("screen registry",()=>{
  it("registers all twenty priority screens",()=>expect(screens.filter((screen)=>screen.highFidelity)).toHaveLength(20));
  it("assigns permission and bilingual labels to every route",()=>{for(const screen of screens){expect(screen.permission).toBeTruthy();expect(screen.title.es).toBeTruthy();expect(screen.title.en).toBeTruthy()}});
  it("resolves approved screen slugs",()=>expect(getScreen("exe-010")?.id).toBe("EXE-010"));
});
