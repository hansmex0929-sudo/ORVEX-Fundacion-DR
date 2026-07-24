import type {AuthContext,PermissionScope} from "@/core/authorization/rbac";import {requirePermission} from "@/core/authorization/rbac";
export type AuditEventInput={tenantId:string;actorId:string|null;action:string;entityType:string;entityId?:string;correlationId:string;outcome:"SUCCESS"|"DENIED"|"FAILURE";reason?:string;safeSummary?:Record<string,unknown>};
export interface AuditRepository{append(event:AuditEventInput):Promise<void>;list(tenantId:string):Promise<readonly AuditEventInput[]>}
export class AuditService{constructor(private readonly repository:AuditRepository){}append(event:AuditEventInput){return this.repository.append(Object.freeze({...event}))}list(context:AuthContext){requirePermission(context,"audit.read");return this.repository.list(context.tenantId)}}
export class MemoryAuditRepository implements AuditRepository{readonly events:AuditEventInput[]=[];async append(event:AuditEventInput){this.events.push(structuredClone(event))}async list(tenantId:string):Promise<readonly AuditEventInput[]>{return this.events.filter((event)=>event.tenantId===tenantId).map((event)=>Object.freeze({...event}))}}
export const auditPermissions:PermissionScope[]=["audit.read"];
