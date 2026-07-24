"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";
import { syntheticSession, hasPermission } from "@/core/authorization/permissions";
import { translations, type Locale, type TranslationKey } from "@/core/localization/translations";
import { screens } from "@/modules/screens/registry";

const aviationAppUrl = process.env.NEXT_PUBLIC_ORVEX_AVIATION_URL ?? "https://orvex-aviation.com";

type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: TranslationKey) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Language context is unavailable");
  return context;
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [locale,setLocale]=useState<Locale>("es");
  const [menuOpen,setMenuOpen]=useState(false);
  const [searchQuery,setSearchQuery]=useState("");
  const pathname=usePathname();
  const t=(key:TranslationKey)=>translations[locale][key];
  const nav=useMemo(()=>screens.filter((screen)=>screen.highFidelity&&hasPermission(syntheticSession,screen.permission)),[]);
  const searchResults=useMemo(()=>{const query=searchQuery.trim().toLocaleLowerCase(locale);if(!query)return [];return nav.filter((screen)=>`${screen.id} ${screen.title[locale]} ${screen.group[locale]}`.toLocaleLowerCase(locale).includes(query)).slice(0,6)},[locale,nav,searchQuery]);
  return <LanguageContext.Provider value={{locale,setLocale,t}}>
    <div className="app-frame">
      <aside className={`sidebar ${menuOpen?"sidebar-open":""}`} aria-label="Navegación principal">
        <div className="brand"><span className="brand-mark">O</span><div><strong>ORVEX</strong><small>FUNDACIÓN DR</small></div></div>
        <nav>{Object.entries(Object.groupBy(nav,(screen)=>screen.group[locale])).map(([group,items])=><div className="nav-group" key={group}><p>{group}</p>{items?.map((screen)=><Link onClick={()=>setMenuOpen(false)} className={pathname.includes(screen.slug)?"active":""} href={`/screens/${screen.slug}`} key={screen.id}><span>{screen.id}</span>{screen.title[locale]}</Link>)}</div>)}</nav>
        <div className="sidebar-note">{t("synthetic")}</div>
      </aside>
      <div className="content-frame">
        <header className="topbar">
          <button className="mobile-menu" onClick={()=>setMenuOpen((value)=>!value)} aria-label="Abrir menú">☰</button>
          <div className="global-search-wrap"><label className="global-search"><span>⌕</span><input aria-label={t("search")} placeholder={t("search")} value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)}/></label>{searchQuery?<div className="search-results" role="listbox" aria-label={t("searchResults")}>{searchResults.length?searchResults.map((screen)=><Link role="option" key={screen.id} href={`/screens/${screen.slug}`} onClick={()=>setSearchQuery("")}><span>{screen.id}</span><strong>{screen.title[locale]}</strong></Link>):<p>{t("noSearchResults")}</p>}</div>:null}</div>
          <div className="header-actions"><a className="aviation-link" href={aviationAppUrl} target="_blank" rel="noopener noreferrer">ORVEX Aviation ↗</a><span className="location">⌖ {t("location")}</span><button title={t("notifications")}>●</button><label className="language"><span className="sr-only">{t("language")}</span><select value={locale} onChange={(event)=>setLocale(event.target.value as Locale)}><option value="es">ES</option><option value="en">EN</option></select></label><button className="profile">AR</button></div>
        </header>
        <main>{children}</main>
      </div>
      {menuOpen?<button aria-label="Cerrar menú" className="menu-backdrop" onClick={()=>setMenuOpen(false)}/>:null}
    </div>
  </LanguageContext.Provider>;
}
