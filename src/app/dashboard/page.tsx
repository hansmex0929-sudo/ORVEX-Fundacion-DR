import {redirect} from "next/navigation";import {currentSession} from "@/core/auth/current-session";import {BilingualShell} from "./shell";
export default async function Dashboard(){const session=await currentSession();if(!session)redirect("/login");return <BilingualShell/>}
