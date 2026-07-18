import {describe,expect,it} from "vitest";
import {authorize,hasPermission,syntheticSession} from "./permissions";
describe("server authorization",()=>{it("allows an assigned scope",()=>expect(hasPermission(syntheticSession,"identity.read")).toBe(true));it("rejects an unassigned scope",async()=>expect(authorize("admin.configuration")).rejects.toThrow("UNAUTHORIZED"))});
