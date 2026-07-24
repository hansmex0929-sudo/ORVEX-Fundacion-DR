import {NextResponse} from "next/server";export async function GET(){return NextResponse.json({service:"orvex-fundacion-dr",status:"ok",database:"postgresql",dataMode:"synthetic-only"})}
