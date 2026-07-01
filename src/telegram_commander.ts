import { Telegraf, Markup } from "telegraf";
import { spawn } from "child_process";
import { QueqApiClient, type StoreSearchResult } from "./queq_api";
import { getGoogleOAuthStartUrl } from "./lib/google_oauth";
import {
  deleteApiAccount,
  getActiveApiAccount,
  loadApiAccounts,
  setActiveApiAccount,
  type ApiAccount,
  updateApiAccountTokens,
} from "./lib/api_accounts";
import { cancelApiBookingRecord, saveApiBookingRecord } from "./lib/api_bookings";
import {
  cancelBatchBookingResults,
  checkBatchAccountAvailability,
  runBatchBooking,
  type BatchBookingResult,
  type BatchBookingTarget,
} from "./lib/api_batch_booking";
import "dotenv/config";

const botToken = process.env.TELEGRAM_BOT_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";
const adminId = process.env.ADMIN_TELEGRAM_ID;

const bot = new Telegraf(botToken, { handlerTimeout: Infinity });

bot.catch((err: any, ctx: any) => {
  console.error(`Telegraf error for ${ctx.updateType}:`, err);
  ctx.reply(`❌ เกิดข้อผิดพลาดในระบบบอท: ${err.message || err}`).catch((e: any) => {
    console.error("Failed to reply with error message:", e);
  });
});


const userState = new Map<number, string>();
const apiBookingCache = new Map<string, { store: StoreSearchResult; people: number; accountId: string }>();
const apiStoreCache = new Map<string, { store: StoreSearchResult; accountId: string }>();
const apiCancelCache = new Map<string, { shopId: number; zoneId: number; queueId: string; accountId: string }>();
const autoBookingSessions = new Map<number, { stores: Map<string, StoreSearchResult>; selected: Set<string>; people?: number }>();
const autoStartCache = new Map<string, { userId: number; totalAccounts: number; people: number; storeKeys: string[] }>();
const autoSingleCancelCache = new Map<string, BatchBookingResult>();
const autoBatchCancelCache = new Map<string, BatchBookingResult[]>();
const localUrlCache = new Map<string, { userId: number; url: string; createdAt: number }>();
const pendingGoogleRefreshTargets = new Map<number, string>();
const pendingGoogleAddAccounts = new Map<number, { otpCode: string }>();

const MAIN_MENU_KEYBOARD = Markup.keyboard([
  ["🔐 เพิ่มบัญชี Google API", "👤 บัญชี API ปัจจุบัน"],
  ["📋 รายการบัญชี API ทั้งหมด", "🔁 สลับบัญชี API"],
  ["🔍 ค้นหาร้านอาหาร", "🤖 ออโต้จอง API"],
  ["❌ API ยกเลิกคิว", "🗑️ ลบบัญชี API"],
] as any, { is_persistent: true } as any).resize();

const authMiddleware = (ctx: any, next: () => Promise<void>) => {
  if (adminId && ctx.from?.id.toString() !== adminId) {
    return ctx.reply(
      "⛔️ คุณไม่มีสิทธิ์ใช้งานบอทนี้ (Not Authorized)\n\n" +
      `Telegram ID ของคุณคือ: ${ctx.from?.id ?? "-"}\n` +
      "เอาเลขนี้ไปใส่ใน ADMIN_TELEGRAM_ID"
    );
  }
  return next();
};

function activeAccountId(): string {
  return getActiveApiAccount()?.id ?? "legacy";
}

function getActiveApiAccountLabel(): string {
  const account = getActiveApiAccount();
  if (!account) return "ยังไม่ได้เลือกบัญชี API";
  return `${account.displayName} <${account.email}>`;
}

function maskSecret(value?: string): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-5)}`;
}

function formatCurrentAccessToken(token?: string): string {
  return token?.trim() || "-";
}

function getApiClient(): QueqApiClient {
  const account = getActiveApiAccount();
  if (!account?.accessToken) {
    throw new Error("ยังไม่มีบัญชี API ให้กด 🔐 เพิ่มบัญชี Google API ก่อน");
  }
  return new QueqApiClient(account.accessToken, account.refreshToken ?? "");
}

function createCacheKey(ctx: any): string {
  return `${ctx.from.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getQueuePeople(queue: any): number | string {
  return queue?.number_of_people ?? queue?.people ?? "ไม่ทราบ";
}

function getQueueNumber(queue: any): number | string {
  return queue?.user_queue ?? queue?.q_number ?? "unknown";
}

function getQueueId(queue: any): string {
  return queue?._id ?? "unknown";
}

function formatQueueCode(queue: any, zone: any): string {
  const code = String(zone?.code ?? queue?.code ?? "");
  const queueNo = getQueueNumber(queue);
  if (typeof queueNo === "number" && code) {
    return `${code}${String(queueNo).padStart(3, "0")}`;
  }
  return code ? `${code}${queueNo}` : String(queueNo);
}

function formatQueueStatus(queue: any): string {
  const status = Number(queue?.user_status ?? 0);
  if (status === 0) return "รอเรียกคิว";
  if (status === 1) return "เรียกคิวแล้ว";
  if (status === 2) return "เสร็จสิ้น";
  return `สถานะ ${status}`;
}

function formatReservationTime(queue: any): string {
  const value = queue?.reservation_date_time;
  if (!value) return "ไม่ทราบ";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (match) {
    return `${match[4]}:${match[5]} น.`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  })} น.`;
}

function formatApiBookingSuccess(params: {
  shopName?: string;
  zoneName?: string;
  shopId: number;
  zoneId: number;
  people: number;
  queue?: any;
  activeQueue?: any;
}): string {
  const queue = params.queue ?? params.activeQueue?.queue;
  const res = params.activeQueue?.res;
  const zone = params.activeQueue?.zone;
  const shopName = res?.res_name ?? params.shopName ?? `Shop ID ${params.shopId}`;
  const branch = res?.res_location ?? "";
  const zoneName = zone?.name ?? params.zoneName ?? `Zone ID ${params.zoneId}`;
  const people = getQueuePeople(queue);

  return [
    "✅ จองคิวสำเร็จ",
    `บัญชี: ${getActiveApiAccountLabel()}`,
    `รหัสรับ OTP: ${maskSecret(getActiveApiAccount()?.otpCode)}`,
    `ร้าน: ${shopName}`,
    branch ? `สาขา: ${branch}` : null,
    `เลขคิว: ${formatQueueCode(queue, zone)}`,
    `สถานะ: ${formatQueueStatus(queue)}`,
    `ผู้จอง: ${queue?.name_user ?? "ไม่ทราบ"}`,
    `เวลาจอง: ${formatReservationTime(queue)}`,
    `โซน: ${zoneName}`,
    `จำนวน: ${people} คน`,
    `Shop ID: ${params.shopId}`,
    `Zone ID: ${params.zoneId}`,
    `Queue ID: ${getQueueId(queue)}`,
  ].filter((line): line is string => Boolean(line)).join("\n");
}

function getPeopleOptions(store: StoreSearchResult): number[] {
  const rawZone = store.raw?.zone ?? {};
  const rawStore = store.raw?.store ?? {};
  const minPeople = Number(rawZone?.min_people ?? rawStore?.min_people ?? 1);
  const maxPeople = Number(rawZone?.max_people ?? rawStore?.max_people ?? 6);
  const min = Number.isFinite(minPeople) && minPeople > 0 ? Math.floor(minPeople) : 1;
  const max = Number.isFinite(maxPeople) && maxPeople >= min ? Math.floor(maxPeople) : 6;
  const cappedMax = Math.min(max, 10);
  return Array.from({ length: cappedMax - min + 1 }, (_, index) => min + index);
}

async function replyText(ctx: any, message: string): Promise<void> {
  try {
    await ctx.reply(message);
  } catch (error) {
    console.error("Telegram reply failed:", error);
  }
}

function isLocalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function openLocalUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = process.platform === "win32"
      ? "cmd"
      : process.platform === "darwin"
        ? "open"
        : "xdg-open";
    const args = process.platform === "win32"
      ? ["/c", "start", "", url]
      : [url];
    const child = spawn(command, args, {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    });
    child.on("error", reject);
    child.unref();
    resolve();
  });
}

async function replyUrl(ctx: any, message: string, buttonLabel: string, url: string): Promise<void> {
  if (isLocalUrl(url)) {
    const key = createCacheKey(ctx);
    localUrlCache.set(key, { userId: ctx.from.id, url, createdAt: Date.now() });
    await ctx.reply(
      message,
      Markup.inlineKeyboard([[Markup.button.callback(buttonLabel, `open_local_url_${key}`)]])
    );
    return;
  }
  await ctx.reply(message, Markup.inlineKeyboard([[Markup.button.url(buttonLabel, url)]]));
}

async function sendGoogleOAuthLogin(ctx: any): Promise<void> {
  userState.set(ctx.from.id, "WAITING_GOOGLE_OTP_CODE");
  await ctx.reply(
    "🔐 เพิ่มบัญชี Google API\n\n" +
    "กรุณาพิมพ์รหัสรับ OTP ของบัญชีนี้ก่อน เช่น:\n" +
    "cb377ke72ziyuoqaque2yfjxotdpurib\n\n" +
    "หลังจากส่งรหัสแล้ว บอทจะถามรหัสผ่านอีเมลต่อ เพื่อเก็บไว้แสดง/ก็อปในหน้าเว็บ"
  );
}

async function sendGoogleOAuthLoginUrl(ctx: any, otpCode: string, emailPassword?: string): Promise<void> {
  try {
    const loginOptions: { emailPassword?: string } = {};
    if (emailPassword) loginOptions.emailPassword = emailPassword;
    const url = getGoogleOAuthStartUrl(ctx.from?.id, otpCode, loginOptions);
    await replyUrl(
      ctx,
      "🔐 ล็อกอิน Google เพื่อเพิ่มบัญชี DQueue API\n\n" +
      `รหัสรับ OTP: ${maskSecret(otpCode)}\n\n` +
      `รหัสผ่านอีเมล: ${maskSecret(emailPassword)}\n\n` +
      "ล็อกอินเสร็จแล้วบอทจะบันทึกบัญชีนั้นไว้ในคลังบัญชี API และตั้งเป็นบัญชี active อัตโนมัติ",
      "เปิด Google Login",
      url
    );
  } catch (error: any) {
    await ctx.reply(
      "สร้างลิงก์ Google login ไม่สำเร็จ ตรวจสอบว่า npm run dev ยังรันที่ localhost:5000 และ .env มี GOOGLE_OAUTH_BASE_URL, GOOGLE_OAUTH_STATE_SECRET\n\n" +
      `รายละเอียด: ${String(error?.message ?? error)}`
    );
  }
}

async function sendGoogleOAuthRefreshUrl(ctx: any, account: ApiAccount, otpCode: string): Promise<void> {
  try {
    const url = getGoogleOAuthStartUrl(ctx.from?.id, otpCode, {
      mode: "refresh",
      targetEmail: account.email,
    });
    await replyUrl(
      ctx,
      "🔄 รีเฟรช token สำหรับบัญชี API เดิม\n\n" +
      `บัญชีเป้าหมาย: ${account.displayName} <${account.email}>\n` +
      `รหัสรับ OTP: ${maskSecret(otpCode)}\n\n` +
      "ให้ล็อกอินด้วย Gmail เดียวกับบัญชีเป้าหมายเท่านั้น ถ้าเมลไม่ตรง ระบบจะไม่บันทึก token ทับบัญชีเดิม",
      "เปิด Google Login เพื่อต่ออายุ",
      url
    );
  } catch (error: any) {
    await ctx.reply(
      "สร้างลิงก์ Google login ไม่สำเร็จ ตรวจสอบว่า npm run dev ยังรันที่ localhost:5000 และ .env มี GOOGLE_OAUTH_BASE_URL, GOOGLE_OAUTH_STATE_SECRET\n\n" +
      `รายละเอียด: ${String(error?.message ?? error)}`
    );
  }
}

function buildApiAccountButtons(action: "switch" | "delete") {
  return loadApiAccounts().map((account) => {
    const activeText = account.active ? "✅ " : "";
    const otpText = account.otpCode ? ` OTP:${maskSecret(account.otpCode)}` : "";
    const label = `${activeText}${account.displayName} (${account.email})${otpText}`.slice(0, 64);
    return [Markup.button.callback(label, `${action}_api_account_${account.id}`)];
  });
}

async function bookQueueByShopName(ctx: any, shopName: string, people?: number) {
  try {
    const api = getApiClient();
    const accountId = activeAccountId();
    await ctx.reply(`Searching QueQ API for "${shopName}"...\nAccount: ${getActiveApiAccountLabel()}`);

    const stores = await api.searchStoresByName(shopName);
    if (stores.length === 0) {
      await ctx.reply(`ไม่พบร้านจาก API สำหรับ "${shopName}"`);
      return;
    }

    const buttons = stores.slice(0, 10).map((store) => {
      const key = createCacheKey(ctx);
      const queueText = typeof store.queue === "number" ? ` Q:${store.queue}` : "";
      const distanceText = typeof store.distance === "number" ? ` ${store.distance.toFixed(2)}km` : "";
      const label = `${store.name} / ${store.zoneName}${queueText}${distanceText}`.slice(0, 64);
      if (typeof people === "number") {
        apiBookingCache.set(key, { store, people, accountId });
        return [Markup.button.callback(label, `api_book_${key}`)];
      }
      apiStoreCache.set(key, { store, accountId });
      return [Markup.button.callback(label, `api_store_${key}`)];
    });

    await ctx.reply(
      typeof people === "number"
        ? `พบ ${stores.length} รายการ เลือกร้านเพื่อจอง ${people} คน:`
        : `พบ ${stores.length} รายการ เลือกร้าน:`,
      Markup.inlineKeyboard(buttons)
    );
  } catch (error: any) {
    await ctx.reply(`API search/booking failed: ${error.message}`);
  }
}

async function bookSelectedStore(ctx: any, store: StoreSearchResult, people: number, accountId: string) {
  if (accountId !== "legacy") await setActiveApiAccount(accountId);

  await ctx.answerCbQuery("Booking via API...");
  await ctx.editMessageText(
    `Booking via API...\n` +
    `Account: ${getActiveApiAccountLabel()}\n` +
    `Shop: ${store.name}\n` +
    `Zone: ${store.zoneName}\n` +
    `Shop ID: ${store.shopId}\n` +
    `Zone ID: ${store.zoneId}\n` +
    `People: ${people}`
  );

  try {
    const api = getApiClient();
    const result = await api.bookQueue(store.shopId, store.zoneId, people);
    if (result.success) {
      const account = getActiveApiAccount();
      if (account) {
        await saveApiBookingRecord({
          account,
          shopId: store.shopId,
          zoneId: store.zoneId,
          people,
          shopName: store.name,
          zoneName: store.zoneName,
          queue: result.queue,
          activeQueue: result.activeQueue,
        });
      }
      await replyText(ctx, formatApiBookingSuccess({
        shopName: store.name,
        zoneName: store.zoneName,
        shopId: store.shopId,
        zoneId: store.zoneId,
        people,
        queue: result.queue,
        activeQueue: result.activeQueue,
      }));
    } else {
      await replyText(ctx, `API booking failed: ${result.message}`);
    }
  } catch (error: any) {
    await replyText(ctx, `API booking failed: ${error.message}`);
  }
}

function getAutoSession(userId: number) {
  let session = autoBookingSessions.get(userId);
  if (!session) {
    session = { stores: new Map<string, StoreSearchResult>(), selected: new Set<string>() };
    autoBookingSessions.set(userId, session);
  }
  return session;
}

function getAutoSelectedStores(userId: number): StoreSearchResult[] {
  const session = getAutoSession(userId);
  return [...session.selected]
    .map((key) => session.stores.get(key))
    .filter((store): store is StoreSearchResult => Boolean(store));
}

function formatAutoStoreLabel(store: StoreSearchResult, selected: boolean): string {
  const mark = selected ? "✅" : "⬜";
  const queueText = typeof store.queue === "number" ? ` Q:${store.queue}` : "";
  const distanceText = typeof store.distance === "number" ? ` ${store.distance.toFixed(1)}km` : "";
  return `${mark} ${store.name} ${store.branch || ""} / ${store.zoneName}${queueText}${distanceText}`.slice(0, 64);
}

function buildAutoStoreKeyboard(userId: number) {
  const session = getAutoSession(userId);
  const buttons = [...session.stores.entries()].map(([key, store]) => [
    Markup.button.callback(formatAutoStoreLabel(store, session.selected.has(key)), `auto_toggle_${key}`),
  ]);
  buttons.push([
    Markup.button.callback("✅ ต่อไป", "auto_next_people"),
    Markup.button.callback("❌ ยกเลิก", "auto_abort"),
  ]);
  return Markup.inlineKeyboard(buttons);
}

async function sendAutoStorePicker(ctx: any, edit = false): Promise<void> {
  const userId = ctx.from.id;
  const session = getAutoSession(userId);
  const message =
    `🤖 ออโต้จอง API\n\n` +
    `เลือกสาขาที่ต้องการจองได้หลายสาขา\n` +
    `เลือกแล้ว: ${session.selected.size} สาขา\n\n` +
    `หลังจากนี้ระบบจะให้เลือกจำนวนคนต่อคิว และใส่จำนวนเมลรวมที่ต้องการใช้`;

  if (edit) {
    await ctx.editMessageText(message, buildAutoStoreKeyboard(userId));
    return;
  }
  await ctx.reply(message, buildAutoStoreKeyboard(userId));
}

async function startAutoBookingSearch(ctx: any): Promise<void> {
  userState.set(ctx.from.id, "AUTO_WAITING_SHOP_SEARCH");
  autoBookingSessions.delete(ctx.from.id);
  await ctx.reply(
    "🤖 ออโต้จอง API\n\n" +
    "พิมพ์ชื่อร้านที่ต้องการค้นหา เช่น:\n" +
    "hotpot\nHOTPOTMAN\n\n" +
    "บอทจะค้นหาร้านผ่าน QueQ API แล้วให้ติ๊กเลือกหลายสาขา"
  );
}

async function searchAutoBookingStores(ctx: any, query: string): Promise<void> {
  const api = getApiClient();
  await ctx.reply(`กำลังค้นหาร้านสำหรับออโต้จอง: "${query}"...`);
  const stores = await api.searchStoresByName(query);
  if (stores.length === 0) {
    await ctx.reply(`ไม่พบร้านจาก API สำหรับ "${query}"`);
    return;
  }

  const session = getAutoSession(ctx.from.id);
  session.stores.clear();
  session.selected.clear();
  delete session.people;

  for (const store of stores.slice(0, 12)) {
    session.stores.set(createCacheKey(ctx), store);
  }

  await sendAutoStorePicker(ctx);
}

function formatPrecheckFailure(precheck: Awaited<ReturnType<typeof checkBatchAccountAvailability>>): string {
  const lines = [
    `บัญชีว่างไม่พอ ต้องใช้ ${precheck.required} เมล แต่ใช้ได้จริง ${precheck.available.length} เมล`,
  ];
  if (precheck.busy.length > 0) {
    lines.push("", "บัญชีที่มีคิวอยู่แล้ว:");
    lines.push(...precheck.busy.map((item) => `- ${item.account.displayName} <${item.account.email}>: ${item.message ?? "busy"}`));
  }
  if (precheck.errors.length > 0) {
    lines.push("", "บัญชีที่ตรวจไม่ได้:");
    lines.push(...precheck.errors.map((item) => `- ${item.account.displayName} <${item.account.email}>: ${item.message ?? "error"}`));
  }
  return lines.join("\n").slice(0, 3900);
}

function formatBatchTargetSummary(stores: StoreSearchResult[], totalAccounts: number, people: number): string {
  const branchLines = stores.map((store, index) => `${index + 1}. ${store.name} ${store.branch || ""} / ${store.zoneName}`);
  return [
    "ตรวจสอบก่อนเริ่มออโต้จอง",
    "",
    `สาขาที่เลือก: ${stores.length}`,
    ...branchLines,
    "",
    `จำนวนเมลรวมที่จะใช้: ${totalAccounts}`,
    `จำนวนคนต่อคิว: ${people}`,
    "การกระจายเมล: วนเฉลี่ยตามสาขาที่เลือก",
  ].join("\n");
}

function formatBatchResultLine(result: BatchBookingResult, index: number): string {
  const status = result.success ? "✅" : "❌";
  const queue = result.queueCode ? ` คิว ${result.queueCode}` : "";
  return `${index}. ${status} ${result.accountName} <${result.accountEmail}> -> ${result.shopName} ${result.branch || ""}${queue}\n${result.message}`;
}

function formatBatchSummary(results: BatchBookingResult[]): string {
  const successCount = results.filter((result) => result.success).length;
  const failCount = results.length - successCount;
  return [
    "🤖 สรุปออโต้จอง API",
    `สำเร็จ: ${successCount}/${results.length}`,
    `ล้มเหลว: ${failCount}/${results.length}`,
    "",
    ...results.map((result, index) => formatBatchResultLine(result, index + 1)),
  ].join("\n").slice(0, 3900);
}

bot.start(authMiddleware, (ctx) => {
  ctx.reply("👋 DQueue Bot Manager API Mode\n\nเลือกคำสั่งจากเมนูด้านล่าง:", MAIN_MENU_KEYBOARD);
});

bot.command(["myid", "id"], (ctx) => {
  ctx.reply(`🆔 Telegram ID ของคุณคือ: ${ctx.from?.id ?? "-"}`);
});

bot.command("googlelogin", authMiddleware, sendGoogleOAuthLogin);
bot.command("autobook", authMiddleware, startAutoBookingSearch);
bot.hears("🤖 ออโต้จอง API", authMiddleware, startAutoBookingSearch);
bot.hears(/ออโต้จอง|auto\s*book/i, authMiddleware, startAutoBookingSearch);
bot.hears("🔐 เพิ่มบัญชี Google API", authMiddleware, sendGoogleOAuthLogin);

bot.hears("👤 บัญชี API ปัจจุบัน", authMiddleware, async (ctx) => {
  const account = getActiveApiAccount();
  if (!account) return ctx.reply("ยังไม่มีบัญชี API ให้กด 🔐 เพิ่มบัญชี Google API ก่อน");

  await ctx.reply(
    "👤 บัญชี API ที่ใช้งานอยู่\n\n" +
    `ชื่อ: ${account.displayName}\n` +
    `อีเมล: ${account.email}\n` +
    `รหัสรับ OTP: ${maskSecret(account.otpCode)}\n` +
    `Token: ${account.accessToken.slice(0, 8)}...${account.accessToken.slice(-6)}`
  );
});

bot.hears("📋 รายการบัญชี API ทั้งหมด", authMiddleware, async (ctx) => {
  const accounts = loadApiAccounts();
  if (accounts.length === 0) return ctx.reply("ยังไม่มีบัญชี API ให้กด 🔐 เพิ่มบัญชี Google API ก่อน");

  const message = accounts.map((account, index) => {
    const activeText = account.active ? "✅ ACTIVE" : "IDLE";
    return `${index + 1}. ${activeText}\nชื่อ: ${account.displayName}\nอีเมล: ${account.email}\nรหัสรับ OTP: ${maskSecret(account.otpCode)}`;
  }).join("\n\n");
  await ctx.reply(`📋 รายการบัญชี API ทั้งหมด\n\n${message}`);
});

bot.hears("🔁 สลับบัญชี API", authMiddleware, async (ctx) => {
  const buttons = buildApiAccountButtons("switch");
  if (buttons.length === 0) return ctx.reply("ยังไม่มีบัญชี API ให้กด 🔐 เพิ่มบัญชี Google API ก่อน");
  await ctx.reply("เลือกบัญชีที่จะใช้สำหรับค้นหา/จอง/ยกเลิกผ่าน API:", Markup.inlineKeyboard(buttons));
});

bot.action(/^switch_api_account_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const account = await setActiveApiAccount(ctx.match[1] ?? "");
  if (!account) {
    await ctx.answerCbQuery("ไม่พบบัญชี");
    return ctx.reply("ไม่พบบัญชีนี้ อาจถูกลบไปแล้ว");
  }
  await ctx.answerCbQuery("เปลี่ยนบัญชีแล้ว");
  await ctx.editMessageText(`✅ เปลี่ยนบัญชี API แล้ว\n\nชื่อ: ${account.displayName}\nอีเมล: ${account.email}\nรหัสรับ OTP: ${maskSecret(account.otpCode)}`);
});

bot.hears("🗑️ ลบบัญชี API", authMiddleware, async (ctx) => {
  const buttons = buildApiAccountButtons("delete");
  if (buttons.length === 0) return ctx.reply("ยังไม่มีบัญชี API ให้ลบ");
  await ctx.reply("เลือกบัญชี API ที่ต้องการลบออกจากบอท:", Markup.inlineKeyboard(buttons));
});

bot.action(/^delete_api_account_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const id = ctx.match[1] ?? "";
  const before = loadApiAccounts().find((account) => account.id === id);
  const accounts = await deleteApiAccount(id);
  await ctx.answerCbQuery("ลบบัญชีแล้ว");
  await ctx.editMessageText(
    `🗑️ ลบบัญชี API แล้ว: ${before?.email ?? id}\n\n` +
    (accounts.length > 0 ? `บัญชี active ตอนนี้: ${getActiveApiAccountLabel()}` : "ตอนนี้ไม่มีบัญชี API ในระบบ")
  );
});

bot.hears("🔍 ค้นหาร้านอาหาร", authMiddleware, async (ctx) => {
  userState.set(ctx.from.id, "API_WAITING_SHOP_SEARCH");
  await ctx.reply(
    "🔍 ค้นหาร้านผ่าน API\n\n" +
    `บัญชี: ${getActiveApiAccountLabel()}\n\n` +
    `รหัสรับ OTP: ${maskSecret(getActiveApiAccount()?.otpCode)}\n\n` +
    "พิมพ์ชื่อร้านอย่างเดียว เช่น:\nhotpot\nHOTPOTMAN\n\nระบบจะค้นหาร้านจาก QueQ API แล้วแสดงเป็นปุ่มให้เลือกจอง",
    MAIN_MENU_KEYBOARD
  );
});

bot.action(/^auto_toggle_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] ?? "";
  const session = getAutoSession(ctx.from.id);
  if (!session.stores.has(key)) {
    await ctx.answerCbQuery("รายการหมดอายุ");
    return;
  }
  if (session.selected.has(key)) {
    session.selected.delete(key);
  } else {
    session.selected.add(key);
  }
  await ctx.answerCbQuery(`${session.selected.size} สาขา`);
  await sendAutoStorePicker(ctx, true);
});

bot.action("auto_next_people", authMiddleware, async (ctx) => {
  const selected = getAutoSelectedStores(ctx.from.id);
  if (selected.length === 0) {
    await ctx.answerCbQuery("เลือกสาขาก่อน");
    return;
  }

  await ctx.answerCbQuery("เลือกจำนวนคน");
  await ctx.editMessageText(
    `เลือกจำนวนคนต่อคิว\n\n` +
    `สาขาที่เลือก: ${selected.length}\n` +
    selected.map((store, index) => `${index + 1}. ${store.name} ${store.branch || ""} / ${store.zoneName}`).join("\n"),
    Markup.inlineKeyboard([
      [1, 2, 3].map((people) => Markup.button.callback(`${people} คน`, `auto_people_${people}`)),
      [4, 5, 6].map((people) => Markup.button.callback(`${people} คน`, `auto_people_${people}`)),
      [Markup.button.callback("❌ ยกเลิก", "auto_abort")],
    ])
  );
});

bot.action(/^auto_people_(\d+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const people = Number(ctx.match[1] ?? "0");
  const session = getAutoSession(ctx.from.id);
  session.people = people;
  userState.set(ctx.from.id, "AUTO_WAITING_TOTAL_ACCOUNTS");
  await ctx.answerCbQuery(`${people} คน`);
  await ctx.editMessageText(
    `ตั้งค่าออโต้จอง\n\n` +
    `จำนวนคนต่อคิว: ${people} คน\n` +
    `สาขาที่เลือก: ${session.selected.size}\n\n` +
    `พิมพ์จำนวนเมลรวมที่ต้องการใช้ เช่น 8\n` +
    `ระบบจะตรวจว่ามีบัญชีว่างพอไหมก่อนเริ่มจอง`
  );
});

bot.action(/^auto_start_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] ?? "";
  const plan = autoStartCache.get(key);
  if (!plan || plan.userId !== ctx.from.id) {
    await ctx.answerCbQuery("รายการหมดอายุ");
    await ctx.reply("รายการออโต้จองหมดอายุแล้ว เริ่มใหม่ด้วย /autobook");
    return;
  }

  const session = getAutoSession(ctx.from.id);
  const stores = plan.storeKeys
    .map((storeKey) => session.stores.get(storeKey))
    .filter((store): store is StoreSearchResult => Boolean(store));
  const targets: BatchBookingTarget[] = stores.map((store) => ({ store, people: plan.people }));
  if (targets.length === 0) {
    await ctx.answerCbQuery("ไม่มีสาขา");
    return;
  }

  await ctx.answerCbQuery("เริ่มออโต้จอง");
  await ctx.editMessageText(`กำลังตรวจบัญชีว่างอีกครั้งก่อนเริ่มจอง ${plan.totalAccounts} เมล...`);

  const precheck = await checkBatchAccountAvailability(plan.totalAccounts);
  if (precheck.available.length < plan.totalAccounts) {
    autoStartCache.delete(key);
    await ctx.reply(`❌ ยังเริ่มไม่ได้\n${formatPrecheckFailure(precheck)}`);
    return;
  }

  await ctx.reply(
    `เริ่มออโต้จอง ${plan.totalAccounts} เมล / ${stores.length} สาขา\n` +
    `Delay ต่อบัญชี: ${Number(process.env.QUEQ_BATCH_DELAY_MS ?? "1200")} ms`
  );

  const results = await runBatchBooking({
    targets,
    totalAccounts: plan.totalAccounts,
    availableAccounts: precheck.available.map((item) => item.account),
    onProgress: async (result, index, total) => {
      await replyText(ctx, `(${index}/${total}) ${formatBatchResultLine(result, index)}`);
    },
  });

  autoStartCache.delete(key);
  userState.delete(ctx.from.id);
  const cancelKey = createCacheKey(ctx);
  autoBatchCancelCache.set(cancelKey, results);
  const cancelButtons = results
    .filter((result) => result.success && result.queueId)
    .map((result) => {
      const itemKey = createCacheKey(ctx);
      autoSingleCancelCache.set(itemKey, result);
      const label = `❌ ${result.accountName} ${result.queueCode ?? ""}`.slice(0, 64);
      return [Markup.button.callback(label, `auto_cancel_one_${itemKey}`)];
    });
  cancelButtons.push([Markup.button.callback("❌ ยกเลิก batch นี้", `auto_cancel_batch_${cancelKey}`)]);

  await ctx.reply(
    formatBatchSummary(results),
    Markup.inlineKeyboard(cancelButtons)
  );
});

bot.action(/^auto_cancel_one_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] ?? "";
  const result = autoSingleCancelCache.get(key);
  if (!result) {
    await ctx.answerCbQuery("รายการหมดอายุ");
    await ctx.reply("รายการยกเลิกรายบัญชีหมดอายุแล้ว ใช้ปุ่ม API ยกเลิกคิว หลังสลับบัญชีที่ต้องการ");
    return;
  }

  await ctx.answerCbQuery("กำลังยกเลิกรายบัญชี");
  await ctx.editMessageText(`กำลังยกเลิกคิวของ ${result.accountName} <${result.accountEmail}>...`);
  const [cancelled] = await cancelBatchBookingResults([result]);
  autoSingleCancelCache.delete(key);
  await ctx.reply(cancelled ? formatBatchResultLine(cancelled, 1) : "ไม่พบผลการยกเลิก");
});

bot.action(/^auto_cancel_batch_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] ?? "";
  const results = autoBatchCancelCache.get(key);
  if (!results) {
    await ctx.answerCbQuery("รายการหมดอายุ");
    await ctx.reply("รายการ batch หมดอายุแล้ว ถ้าจะยกเลิกให้ใช้ปุ่ม API ยกเลิกคิว รายบัญชี");
    return;
  }

  await ctx.answerCbQuery("กำลังยกเลิก batch");
  await ctx.editMessageText("กำลังยกเลิกคิวทั้งหมดใน batch นี้...");
  const cancelled = await cancelBatchBookingResults(results);
  autoBatchCancelCache.delete(key);
  await ctx.reply(
    [
      "สรุปยกเลิก batch",
      ...cancelled.map((result, index) => formatBatchResultLine(result, index + 1)),
    ].join("\n").slice(0, 3900)
  );
});

bot.action("auto_abort", authMiddleware, async (ctx) => {
  userState.delete(ctx.from.id);
  autoBookingSessions.delete(ctx.from.id);
  await ctx.answerCbQuery("ยกเลิกแล้ว");
  await ctx.editMessageText("ยกเลิกออโต้จองแล้ว");
});

bot.hears(/^(?:จองร้าน|book)\s+(.+)\s+(\d+)$/i, authMiddleware, async (ctx) => {
  const shopName = (ctx.match?.[1] || "").trim();
  const people = parseInt(ctx.match?.[2] || "0", 10);
  if (!shopName || Number.isNaN(people) || people <= 0) {
    return ctx.reply("รูปแบบไม่ถูกต้อง เช่น: จองร้าน hotpotman 2");
  }
  await bookQueueByShopName(ctx, shopName, people);
});

bot.action(/^api_store_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] || "";
  const pending = apiStoreCache.get(key);
  if (!pending) {
    await ctx.answerCbQuery("Selection expired");
    await ctx.reply("รายการเลือกร้านหมดอายุแล้ว ค้นหาร้านใหม่อีกครั้ง");
    return;
  }

  if (pending.accountId !== "legacy") await setActiveApiAccount(pending.accountId);
  const buttons = getPeopleOptions(pending.store).map((people) => [
    Markup.button.callback(`${people} คน`, `api_people_${key}_${people}`),
  ]);

  await ctx.answerCbQuery("Select people");
  await ctx.editMessageText(
    `เลือกร้านแล้ว\n` +
    `บัญชี: ${getActiveApiAccountLabel()}\n` +
    `รหัสรับ OTP: ${maskSecret(getActiveApiAccount()?.otpCode)}\n` +
    `ร้าน: ${pending.store.name}\n` +
    `โซน: ${pending.store.zoneName}\n` +
    `Shop ID: ${pending.store.shopId}\n` +
    `Zone ID: ${pending.store.zoneId}\n\n` +
    `เลือกจำนวนคน:`,
    Markup.inlineKeyboard(buttons)
  );
});

bot.action(/^api_people_(.+)_(\d+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] || "";
  const people = parseInt(ctx.match[2] || "0", 10);
  const pending = apiStoreCache.get(key);
  if (!pending || Number.isNaN(people) || people <= 0) {
    await ctx.answerCbQuery("Selection expired");
    await ctx.reply("รายการจองหมดอายุแล้ว ค้นหาร้านใหม่อีกครั้ง");
    return;
  }

  apiStoreCache.delete(key);
  await bookSelectedStore(ctx, pending.store, people, pending.accountId);
});

bot.action(/^api_book_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] || "";
  const pending = apiBookingCache.get(key);
  if (!pending) {
    await ctx.answerCbQuery("Selection expired");
    await ctx.reply("รายการจองหมดอายุแล้ว ค้นหาร้านใหม่อีกครั้ง");
    return;
  }

  apiBookingCache.delete(key);
  await bookSelectedStore(ctx, pending.store, pending.people, pending.accountId);
});

bot.hears("🎟️ API จองคิว", authMiddleware, async (ctx) => {
  userState.set(ctx.from.id, "API_WAITING_SHOP_ID");
  await ctx.reply(
    "🎟️ ระบบจองคิวผ่าน API โดยตรง\n\n" +
    `บัญชี: ${getActiveApiAccountLabel()}\n\n` +
    "พิมพ์ข้อมูลตามรูปแบบนี้:\n" +
    "จอง [Shop ID] [Zone ID] [จำนวนคน]\n\n" +
    "ตัวอย่าง:\nจอง 2315 380 2"
  );
});

bot.hears(/^จอง\s+(-?\d+)\s+(\d+)\s+(\d+)$/i, authMiddleware, async (ctx) => {
  const shopId = Math.abs(parseInt(ctx.match?.[1] ?? "", 10));
  const zoneId = parseInt(ctx.match?.[2] ?? "", 10);
  const people = parseInt(ctx.match?.[3] ?? "", 10);

  await replyText(ctx, `Booking via API...\nAccount: ${getActiveApiAccountLabel()}\nShop ID: ${shopId}\nZone ID: ${zoneId}\nPeople: ${people}`);

  try {
    const api = getApiClient();
    const result = await api.bookQueue(shopId, zoneId, people);
    if (result.success) {
      const account = getActiveApiAccount();
      if (account) {
        await saveApiBookingRecord({
          account,
          shopId,
          zoneId,
          people,
          queue: result.queue,
          activeQueue: result.activeQueue,
        });
      }
      await replyText(ctx, formatApiBookingSuccess({
        shopId,
        zoneId,
        people,
        queue: result.queue,
        activeQueue: result.activeQueue,
      }));
    } else {
      await replyText(ctx, `API booking failed: ${result.message}`);
    }
  } catch (error: any) {
    await replyText(ctx, `API booking failed: ${error.message}`);
  }
});

bot.hears("❌ API ยกเลิกคิว", authMiddleware, async (ctx) => {
  await ctx.reply(`⏳ กำลังตรวจสอบคิวที่ค้างอยู่ในระบบ...\nAccount: ${getActiveApiAccountLabel()}`);

  try {
    const api = getApiClient();
    const queue = await api.getCancelableQueue();
    if (!queue) return ctx.reply("✅ ไม่มีคิวค้างอยู่ในระบบ ไม่ต้องยกเลิกอะไร");

    const cancelKey = createCacheKey(ctx);
    apiCancelCache.set(cancelKey, {
      shopId: Number(queue.id_res_auto),
      zoneId: Number(queue.zone_id),
      queueId: queue._id,
      accountId: activeAccountId(),
    });

    await ctx.reply(
      `📋 พบคิวที่ค้างอยู่ในระบบ:\n\n` +
      `บัญชี: ${getActiveApiAccountLabel()}\n` +
      `รหัสรับ OTP: ${maskSecret(getActiveApiAccount()?.otpCode)}\n` +
      `Shop ID: ${queue.id_res_auto}\n` +
      `Zone ID: ${queue.zone_id}\n` +
      `ชื่อ: ${queue.name_user || "ไม่ทราบ"}\n` +
      `จำนวนคน: ${getQueuePeople(queue)}\n` +
      `เวลาจอง: ${formatReservationTime(queue)}\n\n` +
      `ต้องการยกเลิกคิวนี้หรือไม่?`,
      Markup.inlineKeyboard([[
        Markup.button.callback("✅ ยืนยันยกเลิก", `api_cancel_${cancelKey}`),
        Markup.button.callback("↩️ ไม่ยกเลิก", "api_cancel_abort"),
      ]])
    );
  } catch (error: any) {
    await ctx.reply(`❌ เกิดข้อผิดพลาด: ${error.message}`);
  }
});

bot.action(/^api_cancel_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const cancelKey = ctx.match[1] ?? "";
  const pending = apiCancelCache.get(cancelKey);
  if (!pending) {
    await ctx.answerCbQuery("รายการหมดอายุ");
    await ctx.editMessageText("รายการยกเลิกคิวหมดอายุแล้ว กรุณากด ❌ API ยกเลิกคิว ใหม่");
    return;
  }

  apiCancelCache.delete(cancelKey);
  if (pending.accountId !== "legacy") await setActiveApiAccount(pending.accountId);

  await ctx.answerCbQuery("กำลังยกเลิกคิว...");
  await ctx.editMessageText(`⏳ กำลังส่งคำสั่งยกเลิกคิว...\nAccount: ${getActiveApiAccountLabel()}`);

  try {
    const api = getApiClient();
    const result = await api.cancelQueue(pending.shopId, pending.zoneId, pending.queueId);
    if (result.success) {
      await cancelApiBookingRecord(pending.queueId);
      await ctx.editMessageText(`✅ ยกเลิกคิวสำเร็จ\n${result.message}`);
    } else {
      await ctx.editMessageText(`❌ ยกเลิกคิวไม่สำเร็จ: ${result.message}`);
    }
  } catch (error: any) {
    await ctx.editMessageText(`❌ เกิดข้อผิดพลาด: ${error.message}`);
  }
});

bot.action("api_cancel_abort", authMiddleware, async (ctx) => {
  await ctx.answerCbQuery("ยกเลิกคำสั่ง");
  await ctx.editMessageText("↩️ ยกเลิกคำสั่งแล้ว คิวยังคงอยู่ในระบบ");
});

bot.hears("🔄 รีเฟรชโทเคน", authMiddleware, async (ctx) => {
  const account = getActiveApiAccount();
  if (!account) {
    await ctx.reply("ยังไม่มีบัญชี API ให้เลือก");
    return;
  }

  if (!account.refreshToken) {
    if (account.otpCode) {
      await ctx.reply(
        `🔄 บัญชีนี้ไม่มี refresh token ตรงๆ จะออก token สำหรับจองใหม่ให้บัญชีเดิม\n\n` +
        `บัญชี active: ${account.displayName} <${account.email}>\n` +
        `รหัสรับ OTP: ${maskSecret(account.otpCode)}`
      );
      await sendGoogleOAuthRefreshUrl(ctx, account, account.otpCode);
      return;
    }

    pendingGoogleRefreshTargets.set(ctx.from.id, account.id);
    userState.set(ctx.from.id, "WAITING_GOOGLE_REFRESH_OTP_CODE");
    await ctx.reply(
      `🔄 บัญชีนี้ไม่มี refresh token ตรงๆ ต้องล็อกอิน Google ใหม่เพื่อออก token ที่ใช้จองได้ให้บัญชีเดิม\n\n` +
      `บัญชี active: ${account.displayName} <${account.email}>\n\n` +
      `พิมพ์รหัสรับ OTP ของบัญชีนี้ก่อน แล้วบอทจะส่งลิงก์ Google Login สำหรับต่ออายุบัญชีเดิมให้`
    );
    return;
  }

  await ctx.reply(`⏳ กำลังต่ออายุ Token...\nAccount: ${getActiveApiAccountLabel()}`);
  try {
    const api = new QueqApiClient(account.accessToken, account.refreshToken);
    const refreshed = await api.refreshToken();
    if (!refreshed.success || !refreshed.newAccessToken) {
      await ctx.reply(`❌ ต่ออายุ Token ไม่สำเร็จ: ${refreshed.error}`);
      return;
    }

    const saved = await updateApiAccountTokens(account.id, {
      accessToken: refreshed.newAccessToken,
      refreshToken: account.refreshToken,
    });
    if (!saved) {
      await ctx.reply("❌ ไม่พบบัญชีเดิมที่จะอัปเดต token");
      return;
    }

    const tokenChanged = account.accessToken !== saved.accessToken;
    await ctx.reply(
      `${tokenChanged ? "✅ ต่ออายุ Token สำเร็จ" : "⚠️ ต่ออายุแล้ว แต่ Token ยังเป็นตัวเดิม"}\n` +
      `บัญชี: ${saved.displayName} <${saved.email}>\n\n` +
      `ผลลัพธ์: ${tokenChanged ? "token เปลี่ยนแล้ว" : "backend คืน token เดิมกลับมา"}\n\n` +
      `Token ปัจจุบัน:\n${formatCurrentAccessToken(saved.accessToken)}`
    );
  } catch (error: any) {
    await ctx.reply(`❌ ต่ออายุ Token ไม่สำเร็จ: ${String(error?.message ?? error)}`);
  }
});

bot.command("myqueue", authMiddleware, async (ctx) => {
  await ctx.reply(`⏳ กำลังตรวจสอบคิวในระบบ...\nAccount: ${getActiveApiAccountLabel()}`);

  try {
    const api = getApiClient();
    const activeQueue = await api.getActiveQueue();
    const queue = activeQueue?.queue ?? await api.getMyQueue();
    if (!queue) return ctx.reply("✅ ไม่มีคิวค้างอยู่ในระบบขณะนี้");

    if (activeQueue?.queue) {
      const account = getActiveApiAccount();
      if (account) {
        await saveApiBookingRecord({
          account,
          shopId: Number(queue.id_res_auto),
          zoneId: Number(queue.zone_id),
          people: Number(queue.number_of_people ?? queue.people ?? 0),
          queue,
          activeQueue,
        });
      }
      await replyText(ctx, formatApiBookingSuccess({
        shopId: Number(queue.id_res_auto),
        zoneId: Number(queue.zone_id),
        people: Number(queue.number_of_people ?? queue.people ?? 0),
        queue,
        activeQueue,
      }));
      return;
    }

    await ctx.reply(
      `📋 คิวปัจจุบันของคุณ:\n\n` +
      `บัญชี: ${getActiveApiAccountLabel()}\n` +
      `รหัสรับ OTP: ${maskSecret(getActiveApiAccount()?.otpCode)}\n` +
      `Shop ID: ${queue.id_res_auto}\n` +
      `Zone ID: ${queue.zone_id}\n` +
      `ชื่อ: ${queue.name_user || "ไม่ทราบ"}\n` +
      `จำนวนคน: ${getQueuePeople(queue)}\n` +
      `เวลาจอง: ${formatReservationTime(queue)}\n` +
      `Queue ID: ${queue._id}`
    );
  } catch (error: any) {
    await ctx.reply(`❌ เกิดข้อผิดพลาด: ${error.message}`);
  }
});

bot.on("text", authMiddleware, async (ctx, next) => {
  const state = userState.get(ctx.from.id);
  const text = ctx.message.text.trim();

  if (state === "WAITING_GOOGLE_OTP_CODE") {
    if (!text || text.length < 6) {
      userState.delete(ctx.from.id);
      await ctx.reply("รหัสรับ OTP สั้นเกินไป กรุณากด 🔐 เพิ่มบัญชี Google API แล้วใส่รหัสใหม่อีกครั้ง");
      return;
    }
    pendingGoogleAddAccounts.set(ctx.from.id, { otpCode: text });
    userState.set(ctx.from.id, "WAITING_GOOGLE_EMAIL_PASSWORD");
    await ctx.reply(
      "บันทึกรหัสรับ OTP แล้ว\n\n" +
      "กรุณาพิมพ์รหัสผ่านอีเมลของบัญชีนี้ เพื่อเก็บไว้แสดง/ก็อปในหน้าเว็บ\n" +
      "ถ้าไม่มีหรือไม่ต้องการเก็บ ให้พิมพ์ -"
    );
    return;
  }

  if (state === "WAITING_GOOGLE_EMAIL_PASSWORD") {
    userState.delete(ctx.from.id);
    const pending = pendingGoogleAddAccounts.get(ctx.from.id);
    pendingGoogleAddAccounts.delete(ctx.from.id);
    if (!pending) {
      await ctx.reply("ข้อมูลเพิ่มบัญชีหมดอายุ กรุณากด 🔐 เพิ่มบัญชี Google API ใหม่");
      return;
    }

    const emailPassword = text === "-" ? undefined : text;
    await sendGoogleOAuthLoginUrl(ctx, pending.otpCode, emailPassword);
    return;
  }

  if (state === "WAITING_GOOGLE_REFRESH_OTP_CODE") {
    userState.delete(ctx.from.id);
    const targetId = pendingGoogleRefreshTargets.get(ctx.from.id);
    pendingGoogleRefreshTargets.delete(ctx.from.id);
    const account = targetId ? loadApiAccounts().find((item) => item.id === targetId) : getActiveApiAccount();
    if (!account) {
      await ctx.reply("ไม่พบบัญชีเดิมที่จะต่ออายุ token");
      return;
    }
    if (!text || text.length < 6) {
      await ctx.reply("รหัสรับ OTP สั้นเกินไป กรุณากด 🔄 รีเฟรชโทเคน แล้วใส่รหัสใหม่อีกครั้ง");
      return;
    }
    await sendGoogleOAuthRefreshUrl(ctx, account, text);
    return;
  }

  if (state === "API_WAITING_SHOP_SEARCH") {
    userState.delete(ctx.from.id);
    await bookQueueByShopName(ctx, text);
    return;
  }

  if (state === "AUTO_WAITING_SHOP_SEARCH") {
    userState.delete(ctx.from.id);
    await searchAutoBookingStores(ctx, text);
    return;
  }

  if (state === "AUTO_WAITING_TOTAL_ACCOUNTS") {
    const totalAccounts = Number(text);
    const session = getAutoSession(ctx.from.id);
    const stores = getAutoSelectedStores(ctx.from.id);
    const people = session.people ?? 0;

    if (!Number.isInteger(totalAccounts) || totalAccounts <= 0) {
      await ctx.reply("จำนวนเมลรวมต้องเป็นตัวเลขมากกว่า 0 เช่น 8");
      return;
    }
    if (stores.length === 0 || people <= 0) {
      userState.delete(ctx.from.id);
      await ctx.reply("ข้อมูลออโต้จองไม่ครบ เริ่มใหม่ด้วย /autobook");
      return;
    }

    await ctx.reply(`กำลังตรวจบัญชีว่าง ${totalAccounts} เมลก่อนเริ่มจอง...`);
    const precheck = await checkBatchAccountAvailability(totalAccounts);
    if (precheck.available.length < totalAccounts) {
      await ctx.reply(`❌ ยังเริ่มไม่ได้\n${formatPrecheckFailure(precheck)}`);
      return;
    }

    const startKey = createCacheKey(ctx);
    autoStartCache.set(startKey, {
      userId: ctx.from.id,
      totalAccounts,
      people,
      storeKeys: [...session.selected],
    });

    await ctx.reply(
      `${formatBatchTargetSummary(stores, totalAccounts, people)}\n\n` +
      `บัญชีว่างพอ: ${precheck.available.length} เมล\n` +
      `กดเริ่มจองเพื่อยิง API ทีละบัญชี`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ เริ่มออโต้จอง", `auto_start_${startKey}`)],
        [Markup.button.callback("❌ ยกเลิก", "auto_abort")],
      ])
    );
    return;
  }

  return next();
});

bot.action(/^open_local_url_(.+)$/, authMiddleware, async (ctx) => {
  if (!ctx.match) return;
  const key = ctx.match[1] ?? "";
  const pending = localUrlCache.get(key);

  if (!pending) {
    await ctx.answerCbQuery("ลิงก์หมดอายุแล้ว กรุณาสร้างลิงก์ใหม่", { show_alert: true });
    return;
  }

  if (pending.userId !== ctx.from.id) {
    await ctx.answerCbQuery("ปุ่มนี้เป็นของผู้ใช้คนอื่น", { show_alert: true });
    return;
  }

  if (Date.now() - pending.createdAt > 10 * 60 * 1000) {
    localUrlCache.delete(key);
    await ctx.answerCbQuery("ลิงก์หมดอายุแล้ว กรุณาสร้างลิงก์ใหม่", { show_alert: true });
    return;
  }

  try {
    await openLocalUrl(pending.url);
    await ctx.answerCbQuery("เปิด Google Login บนเครื่องนี้แล้ว");
  } catch (error: any) {
    await ctx.answerCbQuery("เปิด browser ไม่สำเร็จ", { show_alert: true });
    await ctx.reply(`เปิด Google Login ไม่สำเร็จ กรุณาเปิดลิงก์นี้บนเครื่องที่รันโปรแกรม:\n${pending.url}`);
    console.error("Open local URL failed:", error);
  }
});

if (botToken === "YOUR_TELEGRAM_BOT_TOKEN") {
  console.warn("Warning: TELEGRAM_BOT_TOKEN is not configured in .env");
}

bot.launch().then(() => {
  console.log("[Telegram Bot] API-only commander started.");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
