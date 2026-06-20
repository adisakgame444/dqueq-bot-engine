"use client";

import { useEffect, useState } from "react";
import type { ApiBookingRecord } from "../lib/api_bookings";

type DashboardData = {
  bookings: ApiBookingRecord[];
  updatedAt: string;
};

function formatWaiting(value: number | string): string {
  if (typeof value === "number") return String(value);
  return value || "-";
}

function isReadyQueue(value: number | string): boolean {
  if (typeof value === "number") return value === 0;
  return Number(value) === 0;
}

function toSortableWaiting(value: number | string): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : Number.MAX_SAFE_INTEGER;
}

function sortBookings(bookings: ApiBookingRecord[]): ApiBookingRecord[] {
  return [...bookings].sort((a, b) => {
    const waitingDiff = toSortableWaiting(a.waitingAhead) - toSortableWaiting(b.waitingAhead);
    if (waitingDiff !== 0) return waitingDiff;
    const queueA = typeof a.queueNo === "number" ? a.queueNo : Number(a.queueNo);
    const queueB = typeof b.queueNo === "number" ? b.queueNo : Number(b.queueNo);
    if (Number.isFinite(queueA) && Number.isFinite(queueB) && queueA !== queueB) return queueA - queueB;
    return a.updatedAt.localeCompare(b.updatedAt);
  });
}

export default function QueueMonitorClient({ initialBookings }: { initialBookings: ApiBookingRecord[] }) {
  const [bookings, setBookings] = useState(sortBookings(initialBookings));

  useEffect(() => {
    let cancelled = false;
    let syncing = false;

    async function sync() {
      if (syncing) return;
      syncing = true;
      try {
        const res = await fetch("/api/dashboard", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json() as DashboardData;
        if (!cancelled) setBookings(sortBookings(data.bookings));
      } catch (error) {
        console.error("Queue monitor sync failed:", error);
      } finally {
        syncing = false;
      }
    }

    const firstTimer = window.setTimeout(sync, 300);
    const timer = window.setInterval(sync, 5000);
    return () => {
      cancelled = true;
      window.clearTimeout(firstTimer);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="overflow-hidden rounded-[18px] border border-[#dbe7ef] bg-white shadow-xl shadow-slate-300/35">
      <div className="h-1 bg-gradient-to-r from-[#0e9384] via-[#24b4c9] to-[#b5473f]" />
      <div className="grid grid-cols-[minmax(0,1fr)_76px_62px] gap-2 border-b border-[#eef0f3] bg-[#fbfcfe] px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#667085] sm:grid-cols-[minmax(0,1fr)_110px_90px] sm:px-5">
        <span>Shop & Branch</span>
        <span className="text-center">Number</span>
        <span className="text-center">Waiting</span>
      </div>

      {bookings.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-bold text-[#667085]">ยังไม่มีคิวที่กำลังรอเรียก</p>
          <p className="mt-1 text-xs text-[#98a2b3]">คิวที่จองสำเร็จผ่าน API จะแสดงที่นี่อัตโนมัติ</p>
        </div>
      ) : (
        <div>
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="grid grid-cols-[minmax(0,1fr)_76px_62px] gap-2 border-b border-[#f0f2f5] px-4 py-3 transition hover:bg-[#fbfcfe] last:border-b-0 sm:grid-cols-[minmax(0,1fr)_110px_90px] sm:px-5"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-black text-[#202938] sm:text-sm">{booking.shopName}</p>
                <p className="mt-0.5 truncate text-xs font-semibold text-[#667085]">{booking.branch || "-"}</p>
              </div>
              <div className="flex items-center justify-center">
                <span className={`text-base font-black tracking-wide sm:text-lg ${
                  isReadyQueue(booking.waitingAhead) ? "text-[#b5473f]" : "text-[#202938]"
                }`}>
                  {booking.queueCode}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className={`text-base font-black sm:text-lg ${
                  isReadyQueue(booking.waitingAhead) ? "text-[#b5473f]" : "text-[#202938]"
                }`}>
                  {formatWaiting(booking.waitingAhead)}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
