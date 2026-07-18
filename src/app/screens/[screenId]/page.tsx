import { notFound } from "next/navigation";
import { authorize } from "@/core/authorization/permissions";
import { ScreenRenderer } from "@/components/screen-renderer";
import { getScreen, screens } from "@/modules/screens/registry";

export function generateStaticParams(){return screens.map((screen)=>({screenId:screen.slug}))}
export default async function ScreenPage({params}:{params:Promise<{screenId:string}>}){const {screenId}=await params;const screen=getScreen(screenId);if(!screen)notFound();try{await authorize(screen.permission)}catch{return <section className="not-found"><p className="eyebrow">FND-009 · {screen.id}</p><h1>Acceso restringido</h1><p>Esta ruta existe, pero la sesión sintética actual no tiene el permiso requerido. El servidor bloqueó el contenido antes de renderizarlo.</p></section>}return <ScreenRenderer screen={screen}/>}
