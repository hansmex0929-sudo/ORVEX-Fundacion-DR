export type Locale = "es" | "en";

export const translations = {
  es: {
    appName: "ORVEX Fundación DR", search: "Buscar en ORVEX", location: "Santo Domingo Este",
    synthetic: "Datos sintéticos de demostración", placeholder: "Módulo en preparación",
    placeholderBody: "Esta ruta está registrada, protegida y traducida. El flujo operativo se implementará en un sprint posterior.",
    view: "Ver detalle", filters: "Filtros", export: "Exportar", newRecord: "Nuevo registro",
    loading: "Cargando información", empty: "No hay registros para mostrar", error: "No se pudo cargar la información",
    unauthorized: "No tiene permiso para acceder a esta pantalla", notifications: "Notificaciones",
    language: "Idioma", profile: "Perfil", signOut: "Cerrar sesión", overview: "Resumen operativo",
    pending: "Pendiente", completed: "Completado", priority: "Prioridad", status: "Estado",
  },
  en: {
    appName: "ORVEX Foundation DR", search: "Search ORVEX", location: "Santo Domingo East",
    synthetic: "Synthetic demonstration data", placeholder: "Module in preparation",
    placeholderBody: "This route is registered, protected, and translated. The operational workflow will be implemented in a later sprint.",
    view: "View details", filters: "Filters", export: "Export", newRecord: "New record",
    loading: "Loading information", empty: "No records to display", error: "Information could not be loaded",
    unauthorized: "You do not have permission to access this screen", notifications: "Notifications",
    language: "Language", profile: "Profile", signOut: "Sign out", overview: "Operations overview",
    pending: "Pending", completed: "Completed", priority: "Priority", status: "Status",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;
