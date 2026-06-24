import fs from "fs";
import { dataFile } from "./data_dir";
import { prisma } from "./prisma";

const ACCOUNTS_FILE = dataFile("api_accounts.json");
const LEGACY_ACCESS_TOKEN_FILE = dataFile("extracted_tokens.txt");
const LEGACY_REFRESH_TOKEN_FILE = dataFile("extracted_refresh_tokens.txt");

export type ApiAccount = {
  id: string;
  email: string;
  displayName: string;
  emailPassword?: string;
  otpCode?: string;
  photoURL?: string;
  accessToken: string;
  refreshToken?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastUsedAt?: string;
};

function readJsonFile<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeAccounts(accounts: ApiAccount[]): void {
  fs.writeFileSync(ACCOUNTS_FILE, `${JSON.stringify(accounts, null, 2)}\n`);
}

function readLegacyTokens(): { accessToken: string; refreshToken: string } {
  let accessToken = "";
  let refreshToken = "";
  try {
    accessToken = fs.readFileSync(LEGACY_ACCESS_TOKEN_FILE, "utf8").trim().split(/\r?\n/)[0] ?? "";
  } catch { /* no legacy token */ }
  try {
    refreshToken = fs.readFileSync(LEGACY_REFRESH_TOKEN_FILE, "utf8").trim().split(/\r?\n/)[0] ?? "";
  } catch { /* no legacy refresh token */ }
  return { accessToken, refreshToken };
}

function syncLegacyToken(account: ApiAccount): void {
  fs.writeFileSync(LEGACY_ACCESS_TOKEN_FILE, account.accessToken);
  if (account.refreshToken) {
    fs.writeFileSync(LEGACY_REFRESH_TOKEN_FILE, account.refreshToken);
  }
}

function mapDbAccountToApiAccount(account: any): ApiAccount {
  const acc: ApiAccount = {
    id: account.id,
    email: account.email,
    displayName: account.displayName,
    accessToken: account.accessToken,
    active: account.active,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  };
  if (account.emailPassword !== null && account.emailPassword !== undefined) {
    acc.emailPassword = account.emailPassword;
  }
  if (account.otpCode !== null && account.otpCode !== undefined) {
    acc.otpCode = account.otpCode;
  }
  if (account.photoURL !== null && account.photoURL !== undefined) {
    acc.photoURL = account.photoURL;
  }
  if (account.refreshToken !== null && account.refreshToken !== undefined) {
    acc.refreshToken = account.refreshToken;
  }
  if (account.lastUsedAt !== null && account.lastUsedAt !== undefined) {
    acc.lastUsedAt = account.lastUsedAt.toISOString();
  }
  return acc;
}

export function loadApiAccounts(): ApiAccount[] {
  const accounts = readJsonFile<ApiAccount[]>(ACCOUNTS_FILE, []);
  return Array.isArray(accounts) ? accounts : [];
}

export async function syncAccountsFromDb(): Promise<void> {
  try {
    const dbAccounts = await prisma.apiAccount.findMany({
      orderBy: { createdAt: "desc" },
    });
    const accounts: ApiAccount[] = dbAccounts.map(mapDbAccountToApiAccount);
    writeAccounts(accounts);
  } catch (error) {
    console.error("Failed to sync accounts from DB:", error);
  }
}

export function getActiveApiAccount(): ApiAccount | null {
  const accounts = loadApiAccounts();
  const active = accounts.find((account) => account.active) ?? accounts[0] ?? null;
  if (active) return active;

  const legacy = readLegacyTokens();
  if (!legacy.accessToken) return null;

  const legacyAccount: ApiAccount = {
    id: "legacy",
    email: "legacy-token",
    displayName: "Legacy token",
    accessToken: legacy.accessToken,
    active: true,
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
  };
  if (legacy.refreshToken) legacyAccount.refreshToken = legacy.refreshToken;
  return legacyAccount;
}

export async function saveGoogleApiAccount(input: {
  email: string;
  displayName: string;
  emailPassword?: string;
  otpCode?: string;
  photoURL?: string;
  accessToken: string;
  telegramId?: number;
}): Promise<ApiAccount> {
  const now = new Date();
  const id = input.email.toLowerCase();

  // Deactivate all other accounts
  await prisma.apiAccount.updateMany({
    data: { active: false },
  });

  const updatedDb = await prisma.apiAccount.upsert({
    where: { id },
    create: {
      id,
      email: input.email,
      displayName: input.displayName || input.email,
      emailPassword: input.emailPassword || null,
      otpCode: input.otpCode || null,
      photoURL: input.photoURL || null,
      accessToken: input.accessToken,
      active: true,
      lastUsedAt: now,
    },
    update: {
      displayName: input.displayName || input.email,
      accessToken: input.accessToken,
      active: true,
      lastUsedAt: now,
      ...(input.otpCode ? { otpCode: input.otpCode } : {}),
      ...(input.emailPassword ? { emailPassword: input.emailPassword } : {}),
      ...(input.photoURL ? { photoURL: input.photoURL } : {}),
    },
  });

  const result = mapDbAccountToApiAccount(updatedDb);

  await syncAccountsFromDb();
  syncLegacyToken(result);
  return result;
}

export async function updateApiAccountTokens(id: string, input: {
  accessToken: string;
  refreshToken?: string;
  displayName?: string;
  email?: string;
}): Promise<ApiAccount | null> {
  try {
    const updatedDb = await prisma.apiAccount.update({
      where: { id },
      data: {
        accessToken: input.accessToken,
        active: true,
        ...(input.refreshToken ? { refreshToken: input.refreshToken } : {}),
        ...(input.displayName ? { displayName: input.displayName } : {}),
        ...(input.email ? { email: input.email } : {}),
      },
    });

    // Deactivate all other accounts
    await prisma.apiAccount.updateMany({
      where: { NOT: { id } },
      data: { active: false },
    });

    const result = mapDbAccountToApiAccount(updatedDb);

    await syncAccountsFromDb();
    syncLegacyToken(result);
    return result;
  } catch {
    return null;
  }
}

export async function setActiveApiAccount(id: string): Promise<ApiAccount | null> {
  try {
    await prisma.apiAccount.updateMany({
      data: { active: false },
    });

    const updatedDb = await prisma.apiAccount.update({
      where: { id },
      data: { active: true, lastUsedAt: new Date() },
    });

    const result = mapDbAccountToApiAccount(updatedDb);

    await syncAccountsFromDb();
    syncLegacyToken(result);
    return result;
  } catch {
    return null;
  }
}

export async function updateActiveApiToken(accessToken: string, refreshToken?: string): Promise<ApiAccount | null> {
  const active = getActiveApiAccount();
  if (!active || active.id === "legacy") {
    fs.writeFileSync(LEGACY_ACCESS_TOKEN_FILE, accessToken);
    if (refreshToken) fs.writeFileSync(LEGACY_REFRESH_TOKEN_FILE, refreshToken);
    return null;
  }

  try {
    const updatedDb = await prisma.apiAccount.update({
      where: { id: active.id },
      data: {
        accessToken,
        ...(refreshToken ? { refreshToken } : {}),
      },
    });

    const result = mapDbAccountToApiAccount(updatedDb);

    await syncAccountsFromDb();
    syncLegacyToken(result);
    return result;
  } catch {
    return null;
  }
}

export async function deleteApiAccount(id: string): Promise<ApiAccount[]> {
  try {
    await prisma.apiAccount.delete({
      where: { id },
    });

    const remaining = await prisma.apiAccount.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (remaining.length > 0 && !remaining.some(acc => acc.active)) {
      await prisma.apiAccount.update({
        where: { id: remaining[0]!.id },
        data: { active: true },
      });
    }

    await syncAccountsFromDb();
    const accounts = loadApiAccounts();
    const active = accounts.find((account) => account.active) ?? accounts[0] ?? null;
    if (active) syncLegacyToken(active);
    return accounts;
  } catch {
    return loadApiAccounts();
  }
}
