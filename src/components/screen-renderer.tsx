"use client";

import { useLanguage } from "@/components/app-shell";
import { ActivityPanel,DataTable,FilterBar,FormShell,KpiGrid,PageHeader,Planner,StateGallery,StatusBadge } from "@/components/ui";
import type { ScreenDefinition } from "@/modules/screens/registry";

export function ScreenRenderer({screen}:{screen:ScreenDefinition}){
  const {locale,t}=useLanguage(); const title=screen.title[locale];
  if(screen.kind==="placeholder")return <div className="page"><PageHeader id={screen.id} title={title} description={t("placeholderBody")}/><section className="placeholder"><span>◇</span><h2>{t("placeholder")}</h2><p>{t("placeholderBody")}</p><StatusBadge status="No operativo"/></section><StateGallery/></div>;
  const isForm=screen.kind==="form"||screen.kind==="proof"||screen.kind==="approval";
  return <div className="page"><PageHeader id={screen.id} title={title} description="Vista funcional de demostración con información sintética, controles compartidos y revisión humana obligatoria." action={screen.kind==="directory"?t("newRecord"):undefined}/>{screen.kind==="dashboard"?<KpiGrid/>:null}{screen.kind==="planner"?<Planner/>:null}{isForm?<FormShell kind={screen.id}/>:null}{screen.kind==="directory"?<><FilterBar/><DataTable/></>:null}{screen.kind==="profile"?<div className="profile-grid"><section className="summary-card"><div className="record-avatar">MS</div><div><p className="eyebrow">DEMO-0248</p><h2>María Elena Santos</h2><p>Los Mina · Santo Domingo Este</p></div><StatusBadge status="En seguimiento"/></section><ActivityPanel/></div>:null}{screen.kind==="dashboard"?<div className="dashboard-grid"><ActivityPanel/><section className="panel"><div className="panel-title"><h2>Trabajo prioritario</h2><button>Ver cola</button></div><DataTable/></section></div>:null}<StateGallery/></div>;
}
