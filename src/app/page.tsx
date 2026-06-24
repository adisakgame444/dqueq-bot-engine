import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import QueueMonitorClient from "../components/QueueMonitorClient";
import { loadActiveApiBookingsDb } from "../lib/api_bookings";
import { getCurrentWebUser } from "../lib/web_auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentWebUser();
  if (!user) redirect("/login");

  const bookings = await loadActiveApiBookingsDb();

  return (
    <main className="min-h-screen bg-[#f3f5f7] px-4 py-5 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-4">
        <header className="rounded-[18px] border border-[#dbe7ef] bg-white/80 p-4 shadow-lg shadow-slate-300/25">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0e9384]">DQueue</p>
            <h1 className="mt-1 text-xl font-black leading-tight text-[#172033]">Queue Monitor</h1>
            <p className="mt-1 text-xs font-semibold text-[#667085]">
              {user.name} · @{user.username} · {user.role === "ADMIN" ? "Admin" : "User"}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {user.role === "ADMIN" && (
              <Link
                href="/manager"
                className="rounded border border-[#9edbd4] bg-[#e6faf7] px-3 py-2 font-black text-[#107569] shadow-sm transition hover:bg-[#d3f5f0]"
              >
                DQueue Bot Manager
              </Link>
            )}
            <LogoutButton />
          </div>
        </header>

        <QueueMonitorClient initialBookings={bookings} />
      </div>
    </main>
  );
}
