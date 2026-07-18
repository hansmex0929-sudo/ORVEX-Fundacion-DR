"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="not-found"><h1>No se pudo cargar la pantalla</h1><p>Inténtelo de nuevo. No se modificó ningún registro.</p><button className="primary-button" onClick={reset}>Reintentar</button></main>}
