import fs from "fs";
import { loadApiAccounts, type ApiAccount, updateApiAccountTokens } from "./api_accounts";
import { dataFile } from "./data_dir";
import { QueqApiClient } from "../queq_api";
import { prisma } from "./prisma";

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

function mapDbBookingToApiBookingRecord(booking: any): ApiBookingRecord {
  const rec: ApiBookingRecord = {
    id: booking.id,
    accountId: booking.accountId,
    accountEmail: booking.accountEmail,
    accountName: booking.accountName,
    shopId: booking.shopId,
    zoneId: booking.zoneId,
    shopName: booking.shopName,
    branch: booking.branch,
    zoneName: booking.zoneName,
    queueCode: booking.queueCode,
    queueNo: isNaN(Number(booking.queueNo)) ? booking.queueNo : Number(booking.queueNo),
    currentQueueCode: booking.currentQueueCode,
    currentQueueNo: isNaN(Number(booking.currentQueueNo)) ? booking.currentQueueNo : Number(booking.currentQueueNo),
    waitingAhead: isNaN(Number(booking.waitingAhead)) ? booking.waitingAhead : Number(booking.waitingAhead),
    queueId: booking.queueId,
    status: booking.status as ApiBookingRecord["status"],
    statusText: booking.statusText,
    reserverName: booking.reserverName,
    people: booking.people,
    reservationTime: booking.reservationTime.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
  if (booking.emailPassword !== null && booking.emailPassword !== undefined) {
    rec.emailPassword = booking.emailPassword;
  }
  if (booking.otpCode !== null && booking.otpCode !== undefined) {
    rec.otpCode = booking.otpCode;
  }
  if (booking.cancelledAt !== null && booking.cancelledAt !== undefined) {
    rec.cancelledAt = booking.cancelledAt.toISOString();
  }
  return rec;
}

export async function syncBookingsFromDb(): Promise<void> {
  try {
    const dbBookings = await prisma.apiBooking.findMany({
      orderBy: { createdAt: "desc" },
    });
    const bookings: ApiBookingRecord[] = dbBookings.map(mapDbBookingToApiBookingRecord);
    writeBookings(bookings);
  } catch (error) {
    console.error("Failed to sync bookings from DB:", error);
  }
}

export async function saveApiBookingRecord(input: {
  account: ApiAccount;
  shopId: number;
  zoneId: number;
  people: number;
  shopName?: string;
  zoneName?: string;
  queue?: any;
  activeQueue?: any;
}): Promise<ApiBookingRecord> {
  const now = new Date();
  const queue = input.queue ?? input.activeQueue?.queue ?? {};
  const queueId = String(queue?._id ?? `${input.account.id}-${input.shopId}-${input.zoneId}`);

  const existing = await prisma.apiBooking.findUnique({
    where: { id: queueId },
  });

  const res = input.activeQueue?.res ?? {};
  const zone = input.activeQueue?.zone ?? {};
  const status = getStatus(queue);
  const queueNo = String(getQueueNumber(queue));
  const currentQueueNo = String(getCurrentQueueNumber(input.activeQueue));
  const zoneCode = String(zone?.code ?? queue?.code ?? "");

  const shopName = String(res?.res_name ?? input.shopName ?? `Shop ID ${input.shopId}`);
  const branch = String(res?.res_location ?? "");
  const zoneName = String(zone?.name ?? input.zoneName ?? `Zone ID ${input.zoneId}`);
  const queueCode = getQueueCode(queue, zone);
  const currentQueueCode = formatQueueCode(zoneCode, currentQueueNo);
  const waitingAhead = String(getServerWaitingAhead(input.activeQueue) ?? getWaitingAhead(queueNo, currentQueueNo));

  await prisma.apiBooking.upsert({
    where: { id: queueId },
    create: {
      id: queueId,
      accountId: input.account.id,
      accountEmail: input.account.email,
      emailPassword: input.account.emailPassword ?? null,
      accountName: input.account.displayName,
      otpCode: input.account.otpCode ?? null,
      shopId: input.shopId,
      zoneId: input.zoneId,
      shopName,
      branch,
      zoneName,
      queueCode,
      queueNo,
      currentQueueCode,
      currentQueueNo,
      waitingAhead,
      queueId,
      status,
      statusText: getStatusText(status),
      reserverName: String(queue?.name_user ?? input.account.displayName ?? ""),
      people: Number(queue?.number_of_people ?? queue?.people ?? input.people),
      reservationTime: new Date(queue?.reservation_date_time ?? now),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    },
    update: {
      status,
      statusText: getStatusText(status),
      currentQueueCode,
      currentQueueNo,
      waitingAhead,
      updatedAt: now,
    },
  });

  await syncBookingsFromDb();

  const record = loadApiBookings().find((booking) => booking.id === queueId)!;
  return record;
}

export async function cancelApiBookingRecord(queueId: string): Promise<void> {
  const now = new Date();
  try {
    await prisma.apiBooking.update({
      where: { id: queueId },
      data: {
        status: "CANCELLED",
        statusText: getStatusText("CANCELLED"),
        updatedAt: now,
        cancelledAt: now,
      },
    });
    await syncBookingsFromDb();
  } catch (error) {
    console.error(`Failed to cancel booking ${queueId}:`, error);
  }
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
  const now = new Date();
  const existingBookings = await prisma.apiBooking.findMany();

  const results = await mapWithConcurrency(accounts, 4, async (account) => {
    try {
      if (!account.accessToken) return null;
      let api = new QueqApiClient(account.accessToken, account.refreshToken ?? "");
      let activeQueue;
      try {
        activeQueue = await api.getActiveQueue();
      } catch (err: any) {
        if (err.message.includes("status 401") && account.refreshToken) {
          console.log(`Access token expired for ${account.email}, attempting refresh...`);
          const refreshRes = await api.refreshToken();
          if (refreshRes.success && refreshRes.newAccessToken) {
            await updateApiAccountTokens(account.id, {
              accessToken: refreshRes.newAccessToken,
              refreshToken: account.refreshToken,
            });
            api = new QueqApiClient(refreshRes.newAccessToken, account.refreshToken);
            activeQueue = await api.getActiveQueue();
          } else {
            throw err;
          }
        } else {
          throw err;
        }
      }

      const queue = activeQueue?.queue;
      if (queue) {
        const queueId = String(queue?._id ?? `${account.id}-${Number(queue.id_res_auto)}-${Number(queue.zone_id)}`);
        const existing = existingBookings.find((booking) => booking.id === queueId);

        const res = activeQueue?.res ?? {};
        const zone = activeQueue?.zone ?? {};
        const status = getStatus(queue);
        const queueNo = String(getQueueNumber(queue));
        const currentQueueNo = String(getCurrentQueueNumber(activeQueue));
        const zoneCode = String(zone?.code ?? queue?.code ?? "");

        const shopName = String(res?.res_name ?? `Shop ID ${queue.id_res_auto}`);
        const branch = String(res?.res_location ?? "");
        const zoneName = String(zone?.name ?? `Zone ID ${queue.zone_id}`);
        const queueCode = getQueueCode(queue, zone);
        const currentQueueCode = formatQueueCode(zoneCode, currentQueueNo);
        const waitingAhead = String(getServerWaitingAhead(activeQueue) ?? getWaitingAhead(queueNo, currentQueueNo));

        const dbRecord = await prisma.apiBooking.upsert({
          where: { id: queueId },
          create: {
            id: queueId,
            accountId: account.id,
            accountEmail: account.email,
            emailPassword: account.emailPassword ?? null,
            accountName: account.displayName,
            otpCode: account.otpCode ?? null,
            shopId: Number(queue.id_res_auto),
            zoneId: Number(queue.zone_id),
            shopName,
            branch,
            zoneName,
            queueCode,
            queueNo,
            currentQueueCode,
            currentQueueNo,
            waitingAhead,
            queueId,
            status,
            statusText: getStatusText(status),
            reserverName: String(queue?.name_user ?? account.displayName ?? ""),
            people: Number(queue?.number_of_people ?? queue?.people ?? 2),
            reservationTime: new Date(queue?.reservation_date_time ?? now),
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
          },
          update: {
            status,
            statusText: getStatusText(status),
            currentQueueCode,
            currentQueueNo,
            waitingAhead,
            updatedAt: now,
          },
        });

        return mapDbBookingToApiBookingRecord(dbRecord);
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

  for (const accountId of clearAccountIds) {
    await prisma.apiBooking.updateMany({
      where: {
        accountId,
        NOT: {
          OR: [
            { status: "CANCELLED" },
            { status: "COMPLETED" }
          ]
        }
      },
      data: {
        status: "CANCELLED",
        statusText: getStatusText("CANCELLED"),
        updatedAt: now,
        cancelledAt: now,
      }
    });
  }

  await syncBookingsFromDb();

  return loadActiveApiBookings();
}
