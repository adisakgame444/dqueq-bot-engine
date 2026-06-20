import { QueqApiClient, type StoreSearchResult } from "../queq_api";
import { loadApiAccounts, setActiveApiAccount, type ApiAccount } from "./api_accounts";
import { cancelApiBookingRecord, saveApiBookingRecord } from "./api_bookings";

export type AccountAvailability = {
  account: ApiAccount;
  status: "available" | "busy" | "error";
  message?: string;
  queue?: any;
};

export type BatchBookingTarget = {
  store: StoreSearchResult;
  people: number;
};

export type BatchBookingResult = {
  accountId: string;
  accountEmail: string;
  accountName: string;
  shopName: string;
  branch: string;
  zoneName: string;
  shopId: number;
  zoneId: number;
  people: number;
  success: boolean;
  message: string;
  queueId?: string;
  queueCode?: string;
};

export type BatchBookingPrecheck = {
  required: number;
  available: AccountAvailability[];
  busy: AccountAvailability[];
  errors: AccountAvailability[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createClient(account: ApiAccount): QueqApiClient {
  return new QueqApiClient(account.accessToken, account.refreshToken ?? "");
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

export function distributeTargets(targets: BatchBookingTarget[], totalAccounts: number): BatchBookingTarget[] {
  if (targets.length === 0 || totalAccounts <= 0) return [];
  return Array.from({ length: totalAccounts }, (_, index) => targets[index % targets.length]!);
}

export async function checkBatchAccountAvailability(required: number): Promise<BatchBookingPrecheck> {
  const accounts = loadApiAccounts().filter((account) => account.accessToken);
  const available: AccountAvailability[] = [];
  const busy: AccountAvailability[] = [];
  const errors: AccountAvailability[] = [];

  for (const account of accounts) {
    try {
      const activeQueue = await createClient(account).getActiveQueue();
      if (activeQueue?.queue) {
        busy.push({
          account,
          status: "busy",
          message: `มีคิวอยู่แล้ว Shop ID ${activeQueue.queue.id_res_auto}, Zone ID ${activeQueue.queue.zone_id}`,
          queue: activeQueue.queue,
        });
      } else {
        available.push({ account, status: "available" });
      }
    } catch (error: any) {
      errors.push({
        account,
        status: "error",
        message: String(error?.message ?? error),
      });
    }
  }

  return { required, available, busy, errors };
}

export async function runBatchBooking(input: {
  targets: BatchBookingTarget[];
  totalAccounts: number;
  availableAccounts: ApiAccount[];
  delayMs?: number;
  onProgress?: (result: BatchBookingResult, index: number, total: number) => Promise<void> | void;
}): Promise<BatchBookingResult[]> {
  const assignedTargets = distributeTargets(input.targets, input.totalAccounts);
  const accounts = input.availableAccounts.slice(0, input.totalAccounts);
  const delayMs = Math.max(0, input.delayMs ?? Number(process.env.QUEQ_BATCH_DELAY_MS ?? "1200"));
  const results: BatchBookingResult[] = [];

  for (let index = 0; index < assignedTargets.length; index += 1) {
    const target = assignedTargets[index]!;
    const account = accounts[index]!;
    setActiveApiAccount(account.id);

    const baseResult = {
      accountId: account.id,
      accountEmail: account.email,
      accountName: account.displayName,
      shopName: target.store.name,
      branch: target.store.branch,
      zoneName: target.store.zoneName,
      shopId: target.store.shopId,
      zoneId: target.store.zoneId,
      people: target.people,
    };

    let result: BatchBookingResult;
    try {
      const booking = await createClient(account).bookQueue(target.store.shopId, target.store.zoneId, target.people);
      if (booking.success) {
        const record = saveApiBookingRecord({
          account,
          shopId: target.store.shopId,
          zoneId: target.store.zoneId,
          people: target.people,
          shopName: target.store.name,
          zoneName: target.store.zoneName,
          queue: booking.queue,
          activeQueue: booking.activeQueue,
        });
        result = {
          ...baseResult,
          success: true,
          message: booking.message,
          queueId: record.queueId,
          queueCode: record.queueCode || getQueueCode(booking.queue, booking.activeQueue?.zone),
        };
      } else {
        result = {
          ...baseResult,
          success: false,
          message: booking.message,
          ...(booking.queue?._id ? { queueId: String(booking.queue._id) } : {}),
        };
      }
    } catch (error: any) {
      result = {
        ...baseResult,
        success: false,
        message: String(error?.message ?? error),
      };
    }

    results.push(result);
    await input.onProgress?.(result, index + 1, assignedTargets.length);
    if (index < assignedTargets.length - 1 && delayMs > 0) {
      await sleep(delayMs);
    }
  }

  return results;
}

export async function cancelBatchBookingResults(results: BatchBookingResult[]): Promise<BatchBookingResult[]> {
  const accounts = loadApiAccounts();
  const output: BatchBookingResult[] = [];

  for (const result of results.filter((item) => item.success && item.queueId)) {
    const account = accounts.find((item) => item.id === result.accountId);
    if (!account) {
      output.push({ ...result, success: false, message: "ไม่พบบัญชีในระบบ" });
      continue;
    }

    try {
      setActiveApiAccount(account.id);
      const cancelled = await createClient(account).cancelQueue(result.shopId, result.zoneId, result.queueId!);
      if (cancelled.success) {
        cancelApiBookingRecord(result.queueId!);
      }
      output.push({ ...result, success: cancelled.success, message: cancelled.message });
    } catch (error: any) {
      output.push({ ...result, success: false, message: String(error?.message ?? error) });
    }
  }

  return output;
}
