import type { Permission } from "@/core/authorization/permissions";
import type { Locale } from "@/core/localization/translations";

type Bilingual = Record<Locale, string>;
export type ScreenKind = "dashboard" | "directory" | "profile" | "form" | "approval" | "planner" | "proof" | "placeholder";
export type ScreenDefinition = { id: string; slug: string; title: Bilingual; group: Bilingual; permission: Permission; kind: ScreenKind; highFidelity: boolean };

const groups = {
  executive: { es: "Dirección ejecutiva", en: "Executive command" }, identity: { es: "Personas e identidad", en: "People and identity" },
  families: { es: "Familias y hogares", en: "Families and households" }, cases: { es: "Casos y elegibilidad", en: "Cases and eligibility" },
  assistance: { es: "Asistencia y aprobaciones", en: "Assistance and approvals" }, inventory: { es: "Inventario y almacén", en: "Inventory and warehouse" },
  delivery: { es: "Entregas y campo", en: "Delivery and field" }, volunteers: { es: "Voluntariado", en: "Volunteers" },
  compliance: { es: "Cumplimiento y auditoría", en: "Compliance and audit" }, ai: { es: "IA y analítica", en: "AI and analytics" },
  other: { es: "Otros módulos", en: "Other modules" },
};

const priority: Array<[string,string,Bilingual,keyof typeof groups,Permission,ScreenKind]> = [
  ["EXE-010","exe-010",{es:"Panel ejecutivo",en:"Executive dashboard"},"executive","executive.read","dashboard"],
  ["IDN-020","idn-020",{es:"Directorio de personas",en:"People directory"},"identity","identity.read","directory"],
  ["IDN-021","idn-021",{es:"Crear persona y buscar duplicados",en:"Create person and duplicate search"},"identity","identity.read","form"],
  ["IDN-022","idn-022",{es:"Perfil de persona",en:"Person profile"},"identity","identity.read","profile"],
  ["FAM-030","fam-030",{es:"Directorio de familias y hogares",en:"Family and household directory"},"families","household.read","directory"],
  ["FAM-031","fam-031",{es:"Nuevo ingreso de hogar",en:"New household intake"},"families","household.read","form"],
  ["FAM-032","fam-032",{es:"Perfil del hogar",en:"Household profile"},"families","household.read","profile"],
  ["FAM-036","fam-036",{es:"Evaluación de inseguridad alimentaria",en:"Food insecurity assessment"},"families","assessment.read","form"],
  ["CAS-040","cas-040",{es:"Panel de casos",en:"Case dashboard"},"cases","case.read","dashboard"],
  ["CAS-042","cas-042",{es:"Perfil del caso",en:"Case profile"},"cases","case.read","profile"],
  ["AST-050","ast-050",{es:"Panel de asistencia",en:"Assistance dashboard"},"assistance","assistance.request","dashboard"],
  ["AST-051","ast-051",{es:"Nueva solicitud de asistencia",en:"New assistance request"},"assistance","assistance.request","form"],
  ["AST-054","ast-054",{es:"Cola de aprobaciones",en:"Approval queue"},"assistance","assistance.approve","approval"],
  ["INV-060","inv-060",{es:"Panel de inventario",en:"Inventory dashboard"},"inventory","inventory.receive","dashboard"],
  ["INV-061","inv-061",{es:"Catálogo de artículos",en:"Item catalog"},"inventory","inventory.receive","directory"],
  ["INV-067","inv-067",{es:"Constructor de kits",en:"Kit/package builder"},"inventory","inventory.receive","form"],
  ["DEL-070","del-070",{es:"Panel de entregas",en:"Delivery dashboard"},"delivery","delivery.plan","dashboard"],
  ["DEL-072","del-072",{es:"Planificador de rutas",en:"Route planner"},"delivery","delivery.plan","planner"],
  ["DEL-076","del-076",{es:"Prueba de entrega",en:"Proof of delivery"},"delivery","delivery.complete","proof"],
  ["VOL-090","vol-090",{es:"Panel de voluntariado",en:"Volunteer dashboard"},"volunteers","volunteer.manage","dashboard"],
  ["DON-140","don-140",{es:"Resumen de donaciones",en:"Donation summary"},"other","executive.read","dashboard"],
  ["CMP-170","cmp-170",{es:"Panel de cumplimiento",en:"Compliance dashboard"},"compliance","compliance.read","dashboard"],
  ["AIX-180","aix-180",{es:"Centro de comando de IA",en:"AI command center"},"ai","ai.review","dashboard"],
];

const placeholderRanges = [
  ["FND",0,9,"identity.read"],["EXE",11,17,"executive.read"],["IDN",21,29,"identity.read"],["FAM",31,39,"household.read"],
  ["CAS",41,49,"case.read"],["AST",52,59,"assistance.request"],["INV",62,69,"inventory.receive"],["DEL",71,79,"delivery.plan"],
  ["PRJ",80,89,"executive.read"],["VOL",91,99,"volunteer.manage"],["MED",100,109,"identity.read"],["EDU",110,119,"identity.read"],
  ["COM",120,129,"household.read"],["PAR",130,139,"identity.read"],["DON",140,149,"executive.read"],["FIN",150,159,"executive.read"],
  ["DOC",160,164,"identity.read"],["COMMS",165,169,"identity.read"],["CMP",171,179,"compliance.read"],["AIX",181,189,"ai.review"],["ADM",190,199,"admin.configuration"],
] as const;

const priorityIds = new Set(priority.map(([id]) => id));
const placeholders: ScreenDefinition[] = placeholderRanges.flatMap(([prefix,start,end,permission]) =>
  Array.from({length:end-start+1},(_,i)=>start+i).map((n)=>{
    const id=`${prefix}-${String(n).padStart(3,"0")}`;
    return {id,slug:id.toLowerCase(),title:{es:`${id} · Pantalla planificada`,en:`${id} · Planned screen`},group:groups.other,permission,kind:"placeholder",highFidelity:false} as ScreenDefinition;
  }).filter((screen)=>!priorityIds.has(screen.id))
);

export const screens: ScreenDefinition[] = [
  ...priority.map(([id,slug,title,group,permission,kind])=>({id,slug,title,group:groups[group],permission,kind,highFidelity:true})),
  ...placeholders,
];

export const getScreen = (slug: string) => screens.find((screen)=>screen.slug===slug);
