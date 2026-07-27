export type SupportedLocale = "es" | "en" | "ht" | "fr";

export type GeotabScreenDefinition = {
  pageId: `FD-${number}`;
  route: string;
  title: string;
  purpose: string;
  metrics: string[];
  sections: string[];
};

type ScreenKey =
  | "commandCenter"
  | "vehicleDetail"
  | "alerts"
  | "geofences"
  | "integration"
  | "theftCase";

type LocalizedScreenCopy = Record<
  ScreenKey,
  Omit<GeotabScreenDefinition, "pageId" | "route">
>;

const routes: Record<ScreenKey, Pick<GeotabScreenDefinition, "pageId" | "route">> = {
  commandCenter: { pageId: "FD-1010", route: "/fleet/command-center" },
  vehicleDetail: {
    pageId: "FD-1020",
    route: "/fleet/vehicles/[vehicleId]/telematics",
  },
  alerts: { pageId: "FD-1030", route: "/fleet/alerts" },
  geofences: { pageId: "FD-1040", route: "/fleet/geofences" },
  integration: {
    pageId: "FD-1050",
    route: "/settings/integrations/geotab",
  },
  theftCase: {
    pageId: "FD-1060",
    route: "/fleet/theft-cases/[caseId]",
  },
};

const copy: Record<SupportedLocale, LocalizedScreenCopy> = {
  en: {
    commandCenter: {
      title: "Fleet Command Center",
      purpose: "Authorized live fleet visibility, readiness, alerts, and device health.",
      metrics: ["Moving", "Stopped", "Offline", "Maintenance due", "Critical alerts"],
      sections: ["Fleet map", "Vehicle search", "Regional filters", "Freshness", "Active alerts"],
    },
    vehicleDetail: {
      title: "Vehicle Telematics",
      purpose: "Current state, route history, device health, driver assignment, and maintenance meters.",
      metrics: ["Last contact", "Speed", "Odometer", "Device health", "Next service"],
      sections: ["Current location", "Trips", "Diagnostics", "Geofences", "Audit timeline"],
    },
    alerts: {
      title: "Fleet Alerts and Exceptions",
      purpose: "Triage safety, tamper, theft, device, geofence, and maintenance exceptions.",
      metrics: ["Critical", "Unacknowledged", "Assigned", "Escalated", "Resolved today"],
      sections: ["Alert queue", "Assignment", "Evidence", "Escalation", "Resolution"],
    },
    geofences: {
      title: "Geofence Administration",
      purpose: "Create and govern operational, restricted, office, warehouse, port, and border zones.",
      metrics: ["Active zones", "Pending approval", "Triggered today", "Restricted zones", "Inactive"],
      sections: ["Zone map", "Schedules", "Vehicle groups", "Alert rules", "Change history"],
    },
    integration: {
      title: "Geotab Integration",
      purpose: "Administer connectivity, sync health, mappings, and credential-rotation workflows.",
      metrics: ["Connection", "Devices", "Sync lag", "Failed records", "Unmatched devices"],
      sections: ["Provider health", "Sync jobs", "Mappings", "Reconnect", "Audit history"],
    },
    theftCase: {
      title: "Vehicle Theft and Recovery",
      purpose: "Coordinate a confirmed suspected-theft response with authorized security and law enforcement.",
      metrics: ["Case status", "Last contact", "Movement", "Assigned officer", "Police report"],
      sections: ["Live location", "Timeline", "Evidence", "Law enforcement", "Recovery and inspection"],
    },
  },
  es: {
    commandCenter: {
      title: "Centro de Comando de Flota",
      purpose: "Visibilidad autorizada de la flota, disponibilidad, alertas y salud de dispositivos.",
      metrics: ["En movimiento", "Detenidos", "Sin conexión", "Mantenimiento pendiente", "Alertas críticas"],
      sections: ["Mapa de flota", "Búsqueda de vehículos", "Filtros regionales", "Vigencia de datos", "Alertas activas"],
    },
    vehicleDetail: {
      title: "Telemática del Vehículo",
      purpose: "Estado actual, rutas, salud del dispositivo, conductor y medidores de mantenimiento.",
      metrics: ["Último contacto", "Velocidad", "Odómetro", "Salud del dispositivo", "Próximo servicio"],
      sections: ["Ubicación actual", "Viajes", "Diagnósticos", "Geocercas", "Línea de auditoría"],
    },
    alerts: {
      title: "Alertas y Excepciones de Flota",
      purpose: "Gestión de excepciones de seguridad, manipulación, robo, dispositivo, geocerca y mantenimiento.",
      metrics: ["Críticas", "Sin confirmar", "Asignadas", "Escaladas", "Resueltas hoy"],
      sections: ["Cola de alertas", "Asignación", "Evidencia", "Escalamiento", "Resolución"],
    },
    geofences: {
      title: "Administración de Geocercas",
      purpose: "Crear y gobernar zonas operativas, restringidas, oficinas, almacenes, puertos y fronteras.",
      metrics: ["Zonas activas", "Pendientes", "Activadas hoy", "Restringidas", "Inactivas"],
      sections: ["Mapa de zonas", "Horarios", "Grupos de vehículos", "Reglas de alerta", "Historial"],
    },
    integration: {
      title: "Integración Geotab",
      purpose: "Administrar conectividad, sincronización, mapeos y rotación de credenciales.",
      metrics: ["Conexión", "Dispositivos", "Retraso", "Registros fallidos", "Sin mapear"],
      sections: ["Salud del proveedor", "Trabajos de sincronización", "Mapeos", "Reconectar", "Auditoría"],
    },
    theftCase: {
      title: "Robo y Recuperación de Vehículo",
      purpose: "Coordinar una respuesta de robo confirmado con seguridad autorizada y autoridades.",
      metrics: ["Estado", "Último contacto", "Movimiento", "Oficial asignado", "Reporte policial"],
      sections: ["Ubicación", "Cronología", "Evidencia", "Autoridades", "Recuperación e inspección"],
    },
  },
  ht: {
    commandCenter: {
      title: "Sant Kòmand Flòt",
      purpose: "Vizibilite otorize sou flòt la, preparasyon, alèt ak sante aparèy yo.",
      metrics: ["An mouvman", "Kanpe", "Dekonekte", "Antretyen nesesè", "Alèt kritik"],
      sections: ["Kat flòt", "Rechèch machin", "Filtè rejyonal", "Frechè done", "Alèt aktif"],
    },
    vehicleDetail: {
      title: "Telematik Machin",
      purpose: "Eta aktyèl, istwa wout, sante aparèy, chofè ak mezi antretyen.",
      metrics: ["Dènye kontak", "Vitès", "Odomèt", "Sante aparèy", "Pwochen sèvis"],
      sections: ["Pozisyon aktyèl", "Vwayaj", "Dyagnostik", "Jeyokloti", "Istwa odit"],
    },
    alerts: {
      title: "Alèt ak Eksepsyon Flòt",
      purpose: "Jere alèt sekirite, manipilasyon, vòl, aparèy, jeyokloti ak antretyen.",
      metrics: ["Kritik", "San konfimasyon", "Asiyen", "Eskalade", "Rezoud jodi a"],
      sections: ["Lis alèt", "Asiyasyon", "Prèv", "Eskalasyon", "Rezolisyon"],
    },
    geofences: {
      title: "Administrasyon Jeyokloti",
      purpose: "Kreye ak kontwole zòn operasyonèl, entèdi, biwo, depo, pò ak fwontyè.",
      metrics: ["Zòn aktif", "Tann apwobasyon", "Aktive jodi a", "Zòn entèdi", "Inaktif"],
      sections: ["Kat zòn", "Orè", "Gwoup machin", "Règ alèt", "Istwa chanjman"],
    },
    integration: {
      title: "Entegrasyon Geotab",
      purpose: "Jere koneksyon, sante senkronizasyon, kat aparèy ak wotasyon idantifyan.",
      metrics: ["Koneksyon", "Aparèy", "Reta senkronizasyon", "Echèk", "San kat"],
      sections: ["Sante founisè", "Travay senkronizasyon", "Kat", "Rekonekte", "Istwa odit"],
    },
    theftCase: {
      title: "Vòl ak Rekiperasyon Machin",
      purpose: "Kowòdone repons pou yon vòl konfime ak sekirite ak lapolis otorize.",
      metrics: ["Eta dosye", "Dènye kontak", "Mouvman", "Ofisye asiyen", "Rapò lapolis"],
      sections: ["Pozisyon", "Kwonoloji", "Prèv", "Lapolis", "Rekiperasyon ak enspeksyon"],
    },
  },
  fr: {
    commandCenter: {
      title: "Centre de Commandement de la Flotte",
      purpose: "Visibilité autorisée de la flotte, disponibilité, alertes et état des dispositifs.",
      metrics: ["En mouvement", "À l’arrêt", "Hors ligne", "Entretien requis", "Alertes critiques"],
      sections: ["Carte de la flotte", "Recherche", "Filtres régionaux", "Fraîcheur des données", "Alertes actives"],
    },
    vehicleDetail: {
      title: "Télématique du Véhicule",
      purpose: "État actuel, trajets, dispositif, conducteur et compteurs d’entretien.",
      metrics: ["Dernier contact", "Vitesse", "Odomètre", "État du dispositif", "Prochain service"],
      sections: ["Position actuelle", "Trajets", "Diagnostics", "Géorepérage", "Historique d’audit"],
    },
    alerts: {
      title: "Alertes et Exceptions de Flotte",
      purpose: "Traiter les exceptions de sécurité, sabotage, vol, dispositif, zone et entretien.",
      metrics: ["Critiques", "Non acquittées", "Assignées", "Escaladées", "Résolues aujourd’hui"],
      sections: ["File d’alertes", "Affectation", "Preuves", "Escalade", "Résolution"],
    },
    geofences: {
      title: "Administration du Géorepérage",
      purpose: "Créer et gouverner les zones opérationnelles, restreintes, bureaux, dépôts, ports et frontières.",
      metrics: ["Zones actives", "En attente", "Déclenchées aujourd’hui", "Restreintes", "Inactives"],
      sections: ["Carte des zones", "Horaires", "Groupes de véhicules", "Règles d’alerte", "Historique"],
    },
    integration: {
      title: "Intégration Geotab",
      purpose: "Administrer la connexion, la synchronisation, les correspondances et la rotation des identifiants.",
      metrics: ["Connexion", "Dispositifs", "Retard", "Échecs", "Non associés"],
      sections: ["État du fournisseur", "Tâches de synchronisation", "Correspondances", "Reconnexion", "Audit"],
    },
    theftCase: {
      title: "Vol et Récupération du Véhicule",
      purpose: "Coordonner la réponse à un vol confirmé avec la sécurité autorisée et les forces de l’ordre.",
      metrics: ["État du dossier", "Dernier contact", "Mouvement", "Agent assigné", "Rapport de police"],
      sections: ["Position", "Chronologie", "Preuves", "Forces de l’ordre", "Récupération et inspection"],
    },
  },
};

export function getGeotabScreen(
  screen: ScreenKey,
  locale: SupportedLocale = "es",
): GeotabScreenDefinition {
  return { ...routes[screen], ...copy[locale][screen] };
}

export const geotabScreenKeys: ScreenKey[] = [
  "commandCenter",
  "vehicleDetail",
  "alerts",
  "geofences",
  "integration",
  "theftCase",
];