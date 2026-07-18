"use client";

import { useLanguage } from "@/components/app-shell";
import { ActivityPanel,AiCommandCenter,ApprovalQueue,AssistanceDashboard,CaseProfile,ComplianceDashboard,DataTable,DeliveryDashboard,DeliveryProof,ExecutiveDashboard,FilterBar,FoodAssessment,FormShell,HouseholdProfile,InventoryDashboard,ItemCatalog,KitBuilder,KpiGrid,PageHeader,PersonProfile,Planner,StateGallery,StatusBadge,VolunteerDashboard } from "@/components/ui";
import type { ScreenDefinition } from "@/modules/screens/registry";

export function ScreenRenderer({screen}:{screen:ScreenDefinition}){
  const {locale,t}=useLanguage(); const title=screen.title[locale];
  if(screen.kind==="placeholder")return <div className="page"><PageHeader id={screen.id} title={title} description={t("placeholderBody")}/><section className="placeholder"><span>◇</span><h2>{t("placeholder")}</h2><p>{t("placeholderBody")}</p><StatusBadge status={t("noOperational")}/></section><StateGallery/></div>;
  const isForm=screen.kind==="form"&&screen.id!=="INV-067"&&screen.id!=="FAM-036";
  const detailHref=screen.id.startsWith("FAM-")?"/screens/fam-032":"/screens/idn-022";
  const createHref=screen.id.startsWith("FAM-")?"/screens/fam-031":screen.id.startsWith("INV-")?"/screens/inv-063":"/screens/idn-021";
  const isStandardDashboard=screen.kind==="dashboard"&&screen.id!=="AIX-180"&&screen.id!=="CMP-170"&&screen.id!=="VOL-090"&&screen.id!=="EXE-010"&&screen.id!=="AST-050"&&screen.id!=="INV-060"&&screen.id!=="DEL-070";
  const isStandardProfile=screen.kind==="profile"&&screen.id!=="CAS-042"&&screen.id!=="FAM-032"&&screen.id!=="IDN-022";
  const isStandardDirectory=screen.kind==="directory"&&screen.id!=="INV-061";
  return <div className="page"><PageHeader id={screen.id} title={title} description={t("demoDescription")} action={screen.kind==="directory"?t("newRecord"):undefined} actionHref={screen.kind==="directory"?createHref:undefined}/>{isStandardDashboard?<KpiGrid/>:null}{screen.kind==="planner"?<Planner/>:null}{screen.kind==="approval"?<ApprovalQueue/>:null}{screen.kind==="proof"?<DeliveryProof/>:null}{screen.id==="INV-067"?<KitBuilder/>:null}{screen.id==="FAM-036"?<FoodAssessment/>:null}{screen.id==="AIX-180"?<AiCommandCenter/>:null}{screen.id==="CMP-170"?<ComplianceDashboard/>:null}{screen.id==="CAS-042"?<CaseProfile/>:null}{screen.id==="FAM-032"?<HouseholdProfile/>:null}{screen.id==="IDN-022"?<PersonProfile/>:null}{screen.id==="VOL-090"?<VolunteerDashboard/>:null}{screen.id==="EXE-010"?<ExecutiveDashboard/>:null}{screen.id==="AST-050"?<AssistanceDashboard/>:null}{screen.id==="INV-060"?<InventoryDashboard/>:null}{screen.id==="DEL-070"?<DeliveryDashboard/>:null}{screen.id==="INV-061"?<ItemCatalog/>:null}{isForm?<FormShell kind={screen.id}/>:null}{isStandardDirectory?<><FilterBar/><DataTable detailHref={detailHref}/></>:null}{isStandardProfile?<div className="profile-grid"><section className="summary-card"><div className="record-avatar">MS</div><div><p className="eyebrow">DEMO-0248</p><h2>María Elena Santos</h2><p>{t("profileArea")}</p></div><StatusBadge status={t("followUp")}/></section><ActivityPanel/></div>:null}{isStandardDashboard?<div className="dashboard-grid"><ActivityPanel/><section className="panel"><div className="panel-title"><h2>{t("priorityWork")}</h2><button>{t("viewQueue")}</button></div><DataTable detailHref={detailHref}/></section></div>:null}<StateGallery/></div>;
}
