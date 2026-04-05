import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/session";
import DashboardNav from "./nav";

const basePath = process.env.BASE_PATH ?? "";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("coach-session");

  if (!session || !verifySessionToken(session.value)) {
    redirect(`${basePath}/login`);
  }

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardNav />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
