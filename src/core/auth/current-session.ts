import {cookies} from "next/headers";import {verifySession} from "./session";
export async function currentSession(){const secret=process.env.AUTH_SECRET;if(!secret)return null;const token=(await cookies()).get("orvex_session")?.value;return token?verifySession(token,secret):null}
