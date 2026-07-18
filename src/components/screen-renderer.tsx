"use client";

import { useLanguage } from "@/components/app-shell";
import { ActivityPanel,DataTable,FilterBar,FormShell,KpiGrid,PageHeader,Planner,StateGallery,StatusBadge } from "@/components/ui";
import type { ScreenDefinition } from "@/modules/screens/registry";

export function ScreenRenderer({screen}:{screen:ScreenDefinition}){
  const {locale,t}=useLanguage(); const title=screen.title[locale];
  if(screen.kind==="placeholder")return <div className="page"><PageHeader id={screen.id} title={title} description={t("placeholderBody")}/><section className="placeholder"><span>◇</span><h2>{t("placeholder")}</h2><p>{t("placeholderBody")}</p><StatusBadge status={t("noOperational")}/></section><StateGallery/></div>;
  const isForm=screen.kind==="form"||screen.kind==="proof"||screen.kind==="approval";
  const detailHref=screen.id.startsWith("FAM-")?"/screens/fam-032":"/screens/idn-022";
  return <div className="page"><PageHeader id={screen.id} title={title} description={t("demoDescription")} action={screen.kind==="directory"?t("newRecord"):undefined}/>{screen.kind==="dashboard"?<KpiGrid/>:null}{screen.kind==="planner"?<Planner/>:null}{isForm?<FormShell kind={screen.id}/>:null}{screen.kind==="directory"?<><FilterBar/><DataTable detailHref={detailHref}/></>:null}{screen.kind==="profile"?<div className="profile-grid"><section className="summary-card"><div className="record-avatar">MS</div><div><p className="eyebrow">DEMO-0248</p><h2>María Elena Santos</h2><p>{t("profileArea")}</p></div><StatusBadge status={t("followUp")}/></section><ActivityPanel/></div>:null}{screen.kind==="dashboard"?<div className="dashboard-grid"><ActivityPanel/><section className="panel"><div className="panel-title"><h2>{t("priorityWork")}</h2><button>{t("viewQueue")}</button></div><DataTable detailHref={detailHref}/></section></div>:null}<StateGallery/></div>;
}
