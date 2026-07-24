import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "ORVEX Fundación DR", description: "Plataforma interna de operaciones comunitarias" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
