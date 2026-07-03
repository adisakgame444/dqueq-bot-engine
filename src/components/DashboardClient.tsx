"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ApiBookingRecord } from "../lib/api_bookings";

type DashboardAccount = {
  id: string;
  email: string;
  displayName: string;
  otpCode?: string;
  active: boolean;
  updatedAt: string;
};

type DashboardData = {
  accounts: DashboardAccount[];
  bookings: ApiBookingRecord[];
  emailCloneMap: Record<string, number>;
  updatedAt: string;
};

function formatTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "-";
  return date.toLocaleString("th-TH", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  });
}

function maskSecret(value?: string): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-5)}`;
}

function isReadyQueue(value: number | string): boolean {
  if (typeof value === "number") return value === 0;
  return Number(value) === 0;
}

export default function DashboardClient({ initialData }: { initialData: DashboardData }) {
  const [data, setData] = useState<DashboardData>(initialData);
  const [syncState, setSyncState] = useState<"live" | "syncing" | "error">("live");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [agentUrl, setAgentUrl] = useState<string>("http://127.0.0.1:5100");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dqueue_agent_url") || "http://127.0.0.1:5100";
      setAgentUrl(saved);
    }
  }, []);

  const [localAccounts, setLocalAccounts] = useState<any[]>([]);
  const [localBusy, setLocalBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [localError, setLocalError] = useState(false);

  async function localAgentRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${agentUrl.replace(/\/+$/, "")}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });
    const resData = await response.json();
    if (!response.ok || resData.ok === false) {
      throw new Error(resData.error || `HTTP ${response.status}`);
    }
    return resData;
  }

  async function toggleAccountEnabled(accountId: number, currentEnabled: boolean) {
    try {
      setLocalBusy(true);
      setNotice(`กำลัง${currentEnabled ? "ปิด" : "เปิด"}การทำงานบัญชี ${accountId}...`);
      await localAgentRequest(`/api/accounts/${accountId}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled: !currentEnabled }),
      });
      setNotice(`สลับสถานะบัญชี ${accountId} สำเร็จ!`);
      // Update localAccounts state immediately
      const localData = await localAgentRequest<{ accounts: any[] }>("/api/accounts");
      setLocalAccounts(localData.accounts || []);
    } catch (e: any) {
      console.error(e);
      setNotice(`ล้มเหลว: ${e.message}`);
    } finally {
      setLocalBusy(false);
      window.setTimeout(() => setNotice(""), 3500);
    }
  }

  async function addNewAccount() {
    try {
      setLocalBusy(true);
      setNotice("กำลังสร้างและติดตั้งบัญชีจำลองใหม่...");
      const res = await localAgentRequest<{ ok: boolean; account: any }>("/api/accounts", {
        method: "POST",
        body: JSON.stringify({}),
      });
      setNotice(`บัญชีใหม่ ${res.account.name} สร้างและติดตั้งพร้อมใช้งานแล้ว!`);
      // Update localAccounts state immediately
      const localData = await localAgentRequest<{ accounts: any[] }>("/api/accounts");
      setLocalAccounts(localData.accounts || []);
    } catch (e: any) {
      console.error(e);
      setNotice(`สร้างบัญชีล้มเหลว: ${e.message}`);
    } finally {
      setLocalBusy(false);
      window.setTimeout(() => setNotice(""), 3500);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      try {
        setSyncState("syncing");
        const res = await fetch("/api/dashboard", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const nextData = await res.json() as DashboardData;
        if (!cancelled) {
          setData(nextData);
          setSyncState("live");
        }
      } catch (error) {
        console.error("Dashboard sync failed:", error);
        if (!cancelled) setSyncState("error");
      }
    }

    async function syncLocal() {
      try {
        const res = await fetch(`${agentUrl.replace(/\/+$/, "")}/api/accounts`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const localData = await res.json();
        if (!cancelled) {
          setLocalAccounts(localData.accounts || []);
          setLocalError(false);
        }
      } catch (error) {
        console.error("Local agent sync failed:", error);
        if (!cancelled) setLocalError(true);
      }
    }

    sync();
    syncLocal();

    const timer = setInterval(() => {
      sync();
      syncLocal();
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [agentUrl]);

  const { accounts, bookings } = data;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredBookings = normalizedQuery
    ? bookings.filter((booking) => [
      booking.accountEmail,
      booking.emailPassword,
      booking.accountName,
      booking.otpCode,
      booking.shopName,
      booking.branch,
      booking.zoneName,
      booking.queueCode,
      String(booking.queueNo),
      String(booking.waitingAhead),
      booking.reserverName,
    ].some((value) => String(value ?? "").toLowerCase().includes(normalizedQuery)))
    : bookings;

  async function copyText(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  function buildAccountCopyText(booking: ApiBookingRecord): string {
    return [
      `อีเมล: ${booking.accountEmail}`,
      `รหัสผ่าน: ${booking.emailPassword ?? "-"}`,
      `คิว: ${booking.queueCode}`,
      `รออีก: ${booking.waitingAhead ?? "-"} คิว`,
      `จำนวนคน: ${booking.people ?? "-"} คน`,
    ].join("\n");
  }

  function copyButton(label: string, key: string, text: string) {
    return (
      <button
        type="button"
        onClick={() => copyText(key, text)}
        className="shrink-0 rounded border border-[#8bd9ee] bg-[#e8f8fc] px-2 py-1 text-[10px] font-black text-[#0570a6] shadow-sm transition hover:border-[#34bfe3] hover:bg-[#d6f3fa]"
      >
        {copiedKey === key ? "Copied" : label}
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f5f7] p-4 font-sans text-[#202938] antialiased md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-3 border-b border-[#dce5ef] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0e9384]">Admin Console</p>
            <h1 className="text-2xl font-black text-[#172033]">DQueue Bot Manager</h1>
            <p className="text-sm text-[#667085]">API booking dashboard</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/"
              className="rounded border border-[#9edbd4] bg-[#e6faf7] px-3 py-1 font-black text-[#107569] shadow-sm transition hover:bg-[#d3f5f0]"
            >
              กลับหน้า User
            </Link>
            <Link
              href="/manager/control/1"
              className="rounded border border-[#ffd8a8] bg-[#fff7ed] px-3 py-1 font-black text-[#b54708] shadow-sm transition hover:bg-[#ffedd5]"
            >
              💻 รีโมตควบคุมบอท
            </Link>
            <span className="rounded border border-[#9edbd4] bg-[#ecfdf8] px-3 py-1 font-black text-[#107569] shadow-sm">
              {bookings.length} Active Queue
            </span>
            <span className="rounded border border-[#b9d7ff] bg-[#eef6ff] px-3 py-1 font-black text-[#175cd3] shadow-sm">
              {accounts.length} API Account
            </span>
            <span className={`rounded border px-3 py-1 font-bold ${
              syncState === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[#ffd8a8] bg-[#fff7ed] text-[#b54708] shadow-sm"
            }`}>
              {syncState === "error" ? "Sync error" : "Live sync"}
            </span>
          </div>
        </header>

        {/* Notice System Banner */}
        {notice && (
          <div className="rounded-xl border border-[#b7ddd5] bg-[#ecfdf8] px-4 py-3 text-sm font-bold text-[#107569] shadow-sm transition animate-pulse">
            ℹ️ {notice}
          </div>
        )}

        {/* Local Clones Management Dashboard Panel */}
        <section className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-black uppercase tracking-wide text-[#344054]">
                สถานะเครื่องจำลองบอท (Local Clones)
              </h2>
              <button
                type="button"
                disabled={localBusy || localError}
                onClick={addNewAccount}
                className="inline-flex items-center rounded-lg border border-[#9edbd4] bg-[#e6faf7] px-2.5 py-0.5 text-xs font-black text-[#107569] shadow-sm transition hover:bg-[#d3f5f0] disabled:opacity-50"
              >
                + เพิ่มบัญชี
              </button>
            </div>
            {localError && (
              <span className="text-xs font-bold text-rose-600 animate-pulse">
                ⚠️ เชื่อมต่อกับตัวควบคุม Local Agent ในเครื่องไม่ได้ (กรุณาเช็คตัวรัน Terminal)
              </span>
            )}
          </div>

          {localAccounts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#d8dde5] bg-white py-6 text-center shadow-sm">
              <p className="text-xs font-semibold text-[#667085]">
                {localError ? "ไม่สามารถเชื่อมโยงข้อมูลเอเจนต์หลัก" : "กำลังโหลดข้อมูลโปรแกรมจำลอง..."}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {localAccounts.map((acc) => {
                const sessionState = acc.session?.state || "stopped";
                const isRunning = sessionState === "running";
                
                // Lookup mapped email using emailCloneMap
                const mappedEmail = Object.entries(data.emailCloneMap).find(([email, id]) => id === acc.id)?.[0];
                
                const shareableAgentUrl = agentUrl.startsWith("http://127.0.0.1") ? agentUrl.replace("127.0.0.1", "localhost") : agentUrl;
                const webOrigin = typeof window !== "undefined" ? window.location.origin : "";
                const appStreamIos = `${webOrigin}/app-ios/${acc.id}?agent=${encodeURIComponent(shareableAgentUrl)}`;
                const appStreamAndroid = `${webOrigin}/app/${acc.id}?agent=${encodeURIComponent(shareableAgentUrl)}`;
                const googleLoginUrl = `http://localhost:5000/api/auth/google/start-clone?cloneAccountId=${acc.id}`;

                return (
                  <div key={acc.id} className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-sm transition hover:shadow-md hover:border-[#cbd5e1]">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-black text-slate-800">{acc.name}</span>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-black tracking-wide ${
                        acc.enabled ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}>
                        {acc.enabled ? "ACTIVE" : "DISABLED"}
                      </span>
                    </div>

                    <p className="truncate text-[10px] text-slate-500 font-semibold mb-2" title={mappedEmail || "ไม่มีการผูกบัญชีในระบบ"}>
                      📧 {mappedEmail || "ไม่มีการผูกบัญชีในระบบ"}
                    </p>

                    <div className="flex items-center gap-1.5 mb-4 text-[10px]">
                      <span className={`h-2.5 w-2.5 rounded-full ${isRunning ? "bg-emerald-500 animate-ping" : "bg-slate-300"}`} />
                      <span className="font-bold text-slate-600 uppercase">Session: {sessionState}</span>
                    </div>

                    {/* Console actions buttons */}
                    <div className="flex flex-col gap-1.5 mt-2">
                      <div className="grid grid-cols-2 gap-1 text-[9px]">
                        <div className="flex flex-col gap-1">
                          <a href={appStreamIos} target="_blank" rel="noreferrer" className="flex items-center justify-center rounded border border-[#b9d7ff] bg-[#eef6ff] py-1 text-center font-bold text-[#175cd3] hover:bg-[#dbeafe] transition">
                            สตรีม iOS
                          </a>
                          <button
                            type="button"
                            onClick={() => copyText(`copy-ios-${acc.id}`, appStreamIos)}
                            className="rounded border border-dashed border-[#8bd9ee] bg-[#e8f8fc] py-1 text-center font-bold text-[#0570a6] hover:bg-[#d6f3fa] transition"
                          >
                            {copiedKey === `copy-ios-${acc.id}` ? "คัดลอกแล้ว" : "คัดลอกลิงก์ iOS"}
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          <a href={appStreamAndroid} target="_blank" rel="noreferrer" className="flex items-center justify-center rounded border border-slate-200 bg-slate-50 py-1 text-center font-bold text-slate-700 hover:bg-slate-100 transition">
                            สตรีม Android
                          </a>
                          <button
                            type="button"
                            onClick={() => copyText(`copy-android-${acc.id}`, appStreamAndroid)}
                            className="rounded border border-slate-200 bg-white py-1 text-center font-bold text-slate-600 hover:bg-slate-50 transition"
                          >
                            {copiedKey === `copy-android-${acc.id}` ? "คัดลอกแล้ว" : "คัดลอกลิงก์ Android"}
                          </button>
                        </div>
                      </div>

                      {acc.id !== 1 && (
                        <a href={googleLoginUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center rounded border border-[#4ade80] bg-[rgba(74,222,128,0.05)] py-1.5 text-center text-[10px] font-black text-[#15803d] hover:bg-[rgba(74,222,128,0.15)] transition">
                          🔐 เชื่อมต่อ Google (Login)
                        </a>
                      )}

                      <button
                        type="button"
                        disabled={localBusy}
                        onClick={() => toggleAccountEnabled(acc.id, acc.enabled)}
                        className={`w-full rounded-md py-1.5 text-[10px] font-black transition ${
                          acc.enabled 
                            ? "bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100" 
                            : "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        {acc.enabled ? "🔴 ปิดบอททำงาน" : "🟢 เปิดบอททำงาน"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Active Booking Queues Section */}
        <section className="space-y-3 border-t border-[#e2e8f0] pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-black uppercase tracking-wide text-[#344054]">
              คิวที่จองผ่าน API
            </h2>
            <div className="flex flex-col gap-2 sm:items-end">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded border border-[#cbd5e1] bg-white px-3 py-2 text-sm font-semibold text-[#202938] outline-none shadow-sm transition placeholder:font-medium placeholder:text-[#98a2b3] focus:border-[#0e9384] focus:ring-3 focus:ring-[#99f6e4]/50 sm:w-72"
                placeholder="ค้นหาเมล / รหัส / ร้าน / คิว"
              />
              <span className="text-xs text-[#667085]">Last sync: {formatTime(data.updatedAt)}</span>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#d8dde5] bg-white py-16 text-center shadow-sm">
              <p className="text-sm font-semibold text-[#667085]">
                {bookings.length === 0 ? "ยังไม่มีคิวที่จองสำเร็จผ่าน API" : "ไม่พบรายการที่ค้นหา"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredBookings.map((booking) => {
                const ready = isReadyQueue(booking.waitingAhead);
                const cloneId = data.emailCloneMap?.[booking.accountEmail.toLowerCase()] || 1;
                const webOrigin = typeof window !== "undefined" ? window.location.origin : "";
                const shareableAgentUrl = agentUrl.startsWith("http://127.0.0.1") ? agentUrl.replace("127.0.0.1", "localhost") : agentUrl;
                const publicLink = `${webOrigin}/app-ios/${cloneId}?agent=${encodeURIComponent(shareableAgentUrl)}`;
                
                // Lookup local clone details
                const localAccount = localAccounts.find((la) => la.id === cloneId);

                return (
                <article key={booking.id} className={`relative overflow-hidden rounded-[18px] border bg-white p-4 shadow-lg shadow-slate-300/35 ${
                  ready ? "border-[#f1b7b2]" : "border-[#b7ddd5]"
                }`}>
                  <div className={`absolute left-0 top-0 h-1 w-full ${
                    ready ? "bg-[#d95c50]" : "bg-[#0e9384]"
                  }`} />
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black text-[#202938]">{booking.shopName}</p>
                      <p className="truncate text-sm text-[#667085]">{booking.branch || "-"}</p>
                    </div>
                    <div className={`rounded px-3 py-2 text-right ${
                      ready ? "bg-[#fff0ef]" : "bg-[#ecfdf8]"
                    }`}>
                      <p className={`text-[10px] font-black uppercase ${
                        ready ? "text-[#b5473f]" : "text-[#0e9384]"
                      }`}>Queue</p>
                      <p className={`text-2xl font-black ${
                        ready ? "text-[#b5473f]" : "text-[#0e9384]"
                      }`}>{booking.queueCode}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded border border-[#ffe1b3] bg-[#fff8ed] p-3">
                      <p className="text-xs text-[#667085]">สถานะ</p>
                      <p className="font-bold text-[#b58120]">{booking.statusText}</p>
                      <p className="mt-1 text-xs text-[#667085]">
                        กำลังเรียก {booking.currentQueueCode || "-"}
                      </p>
                    </div>
                    <div className="rounded border border-[#c7d7fe] bg-[#f1f5ff] p-3">
                      <p className="text-xs text-[#667085]">ผู้จอง</p>
                      <p className="font-black text-[#263b7f]">{booking.reserverName || booking.accountName}</p>
                    </div>
                    <div className="rounded border border-[#b7ddd5] bg-[#f0fbf8] p-3">
                      <p className="text-xs text-[#667085]">โซน / จำนวน</p>
                      <p className="font-black text-[#107569]">{booking.zoneName} / {booking.people} คน</p>
                      <p className={`mt-1 text-xs font-bold ${ready ? "text-[#b5473f]" : "text-[#667085]"}`}>
                        รออีก {booking.waitingAhead ?? "-"} คิว
                      </p>
                    </div>

                    {/* Real-time local clone emulator status display */}
                    {localAccount && (
                      <div className="rounded border border-[#cbd5e1] bg-[#f8fafc] p-3">
                        <p className="text-xs text-[#667085]">เครื่องสตรีมบอท ({localAccount.name})</p>
                        <p className={`font-black ${localAccount.enabled ? "text-[#0e9384]" : "text-[#b5473f]"}`}>
                          {localAccount.enabled ? "🟢 บอททำงานอยู่" : "🔴 บอทถูกปิด"}
                        </p>
                        <p className="mt-1 text-xs text-[#667085] uppercase font-bold">
                          Session: {localAccount.session?.state || "stopped"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2 border-t border-[#e4e7ec] pt-3 text-xs text-[#667085]">
                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate">
                        บัญชี: <span className="font-mono text-[#0570a6]">{booking.accountEmail}</span>
                      </p>
                      {copyButton("Copy", `account-${booking.id}`, buildAccountCopyText(booking))}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate">
                        ลิงก์ส่งต่อ (เปิดแอป): <span className="font-mono text-[#0e9384]">{publicLink}</span>
                      </p>
                      {copyButton("Copy Link", `link-${booking.id}`, publicLink)}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate">
                        OTP: <span className="font-mono text-[#b58120]">{maskSecret(booking.otpCode)}</span>
                      </p>
                      {copyButton("Copy", `otp-${booking.id}`, booking.otpCode ?? "")}
                    </div>

                    {/* Quick controls inside individual queue cards */}
                    {localAccount && (
                      <div className="mt-2 pt-2 border-t border-dashed border-[#e4e7ec] flex flex-wrap gap-1.5">
                        <a 
                          href={`${webOrigin}/app-ios/${cloneId}?agent=${encodeURIComponent(shareableAgentUrl)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="rounded border border-[#b9d7ff] bg-[#eef6ff] px-2 py-1 text-[10px] font-black text-[#175cd3] hover:bg-[#dbeafe] transition"
                        >
                          🖥️ สตรีม iOS
                        </a>
                        {cloneId !== 1 && (
                          <a 
                            href={`http://localhost:5000/api/auth/google/start-clone?cloneAccountId=${cloneId}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="rounded border border-[#4ade80] bg-[rgba(74,222,128,0.05)] px-2 py-1 text-[10px] font-black text-[#15803d] hover:bg-[rgba(74,222,128,0.15)] transition"
                          >
                            🔐 ล็อกอิน Google
                          </a>
                        )}
                        <button
                          type="button"
                          disabled={localBusy}
                          onClick={() => toggleAccountEnabled(cloneId, localAccount.enabled)}
                          className={`rounded px-2 py-1 text-[10px] font-black transition ${
                            localAccount.enabled
                              ? "bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100"
                              : "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {localAccount.enabled ? "🔴 ปิดบอท" : "🟢 เปิดบอท"}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              )})}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
