import fs from "fs";
import { loadApiAccounts, type ApiAccount } from "./api_accounts";
import { dataFile } from "./data_dir";
import { QueqApiClient } from "../queq_api";

const BOOKINGS_FILE = dataFile("api_bookings.json");
let activeSyncPromise: Promise<ApiBookingRecord[]> | null = null;

export type ApiBookingRecord = {
  id: string;
  accountId: string;
  accountEmail: string;
  emailPassword?: string;
  accountName: string;
  otpCode?: string;
  shopId: number;
  zoneId: number;
  shopName: string;
  branch: string;
  zoneName: string;
  queueCode: string;
  queueNo: number | string;
  currentQueueCode: string;
  currentQueueNo: number | string;
  waitingAhead: number | string;
  queueId: string;
  status: "WAITING_QUEUE" | "CALLING" | "COMPLETED" | "CANCELLED";
  statusText: string;
  reserverName: string;
  people: number | string;
  reservationTime: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
};

function readJsonFile<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeBookings(bookings: ApiBookingRecord[]): void {
  fs.writeFileSync(BOOKINGS_FILE, `${JSON.stringify(bookings, null, 2)}\n`);
}

export function loadApiBookings(): ApiBookingRecord[] {
  const bookings = readJsonFile<ApiBookingRecord[]>(BOOKINGS_FILE, []);
  return Array.isArray(bookings) ? bookings : [];
}

function toSortableWaiting(value: number | string): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : Number.MAX_SAFE_INTEGER;
}

function compareBookingsByWaiting(a: ApiBookingRecord, b: ApiBookingRecord): number {
  const waitingDiff = toSortableWaiting(a.waitingAhead) - toSortableWaiting(b.waitingAhead);
  if (waitingDiff !== 0) return waitingDiff;

  const queueA = typeof a.queueNo === "number" ? a.queueNo : Number(a.queueNo);
  const queueB = typeof b.queueNo === "number" ? b.queueNo : Number(b.queueNo);
  if (Number.isFinite(queueA) && Number.isFinite(queueB) && queueA !== queueB) {
    return queueA - queueB;
  }

  return a.updatedAt.localeCompare(b.updatedAt);
}

export function loadActiveApiBookings(): ApiBookingRecord[] {
  return loadApiBookings()
    .filter((booking) => booking.status !== "CANCELLED" && booking.status !== "COMPLETED")
    .sort(compareBookingsByWaiting);
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      const item = items[index];
      if (item === undefined) continue;
      results[index] = await worker(item);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker())
  );
  return results;
}

function getQueueNumber(queue: any): number | string {
  return queue?.user_queue ?? queue?.q_number ?? "unknown";
}

function getQueueCode(queue: any, zone: any): string {
  const code = String(zone?.code ?? queue?.code ?? "");
  const queueNo = getQueueNumber(queue);
  if (typeof queueNo === "number" && code) {
    return `${code}${String(queueNo).padStart(3, "0")}`;
  }
  return code ? `${code}${queueNo}` : String(queueNo);
}

function formatQueueCode(code: string, queueNo: number | string): string {
  if (typeof queueNo === "number" && code) {
    return `${code}${String(queueNo).padStart(3, "0")}`;
  }
  return code ? `${code}${queueNo}` : String(queueNo);
}

function getCurrentQueueNumber(activeQueue: any): number | string {
  const zoneQueue = Number(activeQueue?.zone?.queue);
  if (Number.isFinite(zoneQueue)) return zoneQueue;
  const resQueue = Number(activeQueue?.res?.res_queue);
  if (Number.isFinite(resQueue)) return resQueue;
  return "unknown";
}

function getWaitingAhead(queueNo: number | string, currentQueueNo: number | string): number | string {
  if (typeof queueNo !== "number" || typeof currentQueueNo !== "number") return "unknown";
  return Math.max(queueNo - currentQueueNo, 0);
}

function getServerWaitingAhead(activeQueue: any): number | null {
  const wait = Number(
    activeQueue?.queueToWait ??
    activeQueue?.waitting ??
    activeQueue?.waiting ??
    activeQueue?.wait?.queueToWait
  );
  return Number.isFinite(wait) && wait >= 0 ? wait : null;
}

function getStatus(queue: any): ApiBookingRecord["status"] {
  const status = Number(queue?.user_status ?? 0);
  if (status === 1) return "CALLING";
  if (status === 2) return "COMPLETED";
  return "WAITING_QUEUE";
}

function getStatusText(status: ApiBookingRecord["status"]): string {
  if (status === "CALLING") return "เรียกคิวแล้ว";
  if (status === "COMPLETED") return "เสร็จสิ้น";
  if (status === "CANCELLED") return "ยกเลิกแล้ว";
  return "รอเรียกคิว";
}

export function saveApiBookingRecord(input: {
  account: ApiAccount;
  shopId: number;
  zoneId: number;
  people: number;
  shopName?: string;
  zoneName?: string;
  queue?: any;
  activeQueue?: any;
}): ApiBookingRecord {
  const now = new Date().toISOString();
  const existing = loadApiBookings().find((booking) => {
    const queue = input.queue ?? input.activeQueue?.queue ?? {};
    const queueId = String(queue?._id ?? `${input.account.id}-${input.shopId}-${input.zoneId}`);
    return booking.id === queueId;
  });
  const record = buildApiBookingRecord(input, now, existing?.createdAt);

  const bookings = loadApiBookings();
  writeBookings([
    record,
    ...bookings.filter((booking) => booking.id !== record.id),
  ]);
  return record;
}

function buildApiBookingRecord(input: {
  account: ApiAccount;
  shopId: number;
  zoneId: number;
  people: number;
  shopName?: string;
  zoneName?: string;
  queue?: any;
  activeQueue?: any;
}, now: string, existingCreatedAt?: string): ApiBookingRecord {
  const queue = input.queue ?? input.activeQueue?.queue ?? {};
  const res = input.activeQueue?.res ?? {};
  const zone = input.activeQueue?.zone ?? {};
  const queueId = String(queue?._id ?? `${input.account.id}-${input.shopId}-${input.zoneId}`);
  const status = getStatus(queue);
  const queueNo = getQueueNumber(queue);
  const currentQueueNo = getCurrentQueueNumber(input.activeQueue);
  const zoneCode = String(zone?.code ?? queue?.code ?? "");

  const record: ApiBookingRecord = {
    id: queueId,
    accountId: input.account.id,
    accountEmail: input.account.email,
    accountName: input.account.displayName,
    shopId: input.shopId,
    zoneId: input.zoneId,
    shopName: String(res?.res_name ?? input.shopName ?? `Shop ID ${input.shopId}`),
    branch: String(res?.res_location ?? ""),
    zoneName: String(zone?.name ?? input.zoneName ?? `Zone ID ${input.zoneId}`),
    queueCode: getQueueCode(queue, zone),
    queueNo,
    currentQueueCode: formatQueueCode(zoneCode, currentQueueNo),
    currentQueueNo,
    waitingAhead: getServerWaitingAhead(input.activeQueue) ?? getWaitingAhead(queueNo, currentQueueNo),
    queueId,
    status,
    statusText: getStatusText(status),
    reserverName: String(queue?.name_user ?? input.account.displayName ?? ""),
    people: queue?.number_of_people ?? queue?.people ?? input.people,
    reservationTime: String(queue?.reservation_date_time ?? now),
    createdAt: existingCreatedAt ?? now,
    updatedAt: now,
  };
  if (input.account.otpCode) {
    record.otpCode = input.account.otpCode;
  }
  if (input.account.emailPassword) {
    record.emailPassword = input.account.emailPassword;
  }
  return record;
}

export function cancelApiBookingRecord(queueId: string): void {
  const now = new Date().toISOString();
  const bookings = loadApiBookings().map((booking) => {
    if (booking.queueId !== queueId && booking.id !== queueId) return booking;
    return {
      ...booking,
      status: "CANCELLED" as const,
      statusText: getStatusText("CANCELLED"),
      updatedAt: now,
      cancelledAt: now,
    };
  });
  writeBookings(bookings);
}

function clearActiveBookingsForAccount(accountId: string): void {
  const now = new Date().toISOString();
  const bookings = loadApiBookings().map((booking) => {
    if (booking.accountId !== accountId) return booking;
    if (booking.status === "CANCELLED" || booking.status === "COMPLETED") return booking;
    return {
      ...booking,
      status: "CANCELLED" as const,
      statusText: getStatusText("CANCELLED"),
      updatedAt: now,
      cancelledAt: now,
    };
  });
  writeBookings(bookings);
}

export async function syncActiveApiBookingsFromAccounts(): Promise<ApiBookingRecord[]> {
  if (activeSyncPromise) return activeSyncPromise;

  activeSyncPromise = syncActiveApiBookingsFromAccountsInternal().finally(() => {
    activeSyncPromise = null;
  });
  return activeSyncPromise;
}

async function syncActiveApiBookingsFromAccountsInternal(): Promise<ApiBookingRecord[]> {
  const accounts = loadApiAccounts();
  const now = new Date().toISOString();
  const existingBookings = loadApiBookings();

  const results = await mapWithConcurrency(accounts, 4, async (account) => {
    try {
      if (!account.accessToken) return null;
      const api = new QueqApiClient(account.accessToken, account.refreshToken ?? "");
      const activeQueue = await api.getActiveQueue();
      const queue = activeQueue?.queue;

      if (queue) {
        const queueId = String(queue?._id ?? `${account.id}-${Number(queue.id_res_auto)}-${Number(queue.zone_id)}`);
        const existing = existingBookings.find((booking) => booking.id === queueId);
        return buildApiBookingRecord({
          account,
          shopId: Number(queue.id_res_auto),
          zoneId: Number(queue.zone_id),
          people: Number(queue.number_of_people ?? queue.people ?? 0),
          queue,
          activeQueue,
        }, now, existing?.createdAt);
      }
      return { clearAccountId: account.id };
    } catch (error) {
      console.error(`Failed to sync active queue for ${account.email}:`, error);
      return null;
    }
  });

  const clearAccountIds = new Set(
    results
      .filter((result): result is { clearAccountId: string } => Boolean(result && "clearAccountId" in result))
      .map((result) => result.clearAccountId)
  );
  const records = results.filter((result): result is ApiBookingRecord => Boolean(result && "id" in result));
  const recordIds = new Set(records.map((record) => record.id));

  const nextBookings = existingBookings
    .map((booking) => {
      if (!clearAccountIds.has(booking.accountId)) return booking;
      if (booking.status === "CANCELLED" || booking.status === "COMPLETED") return booking;
      return {
        ...booking,
        status: "CANCELLED" as const,
        statusText: getStatusText("CANCELLED"),
        updatedAt: now,
        cancelledAt: now,
      };
    })
    .filter((booking) => !recordIds.has(booking.id));

  writeBookings([...records, ...nextBookings]);

  return loadActiveApiBookings();
}
