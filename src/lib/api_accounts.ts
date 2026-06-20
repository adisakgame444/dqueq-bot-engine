import fs from "fs";
import { dataFile } from "./data_dir";

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

export function loadApiAccounts(): ApiAccount[] {
  const accounts = readJsonFile<ApiAccount[]>(ACCOUNTS_FILE, []);
  return Array.isArray(accounts) ? accounts : [];
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

export function saveGoogleApiAccount(input: {
  email: string;
  displayName: string;
  emailPassword?: string;
  otpCode?: string;
  photoURL?: string;
  accessToken: string;
  telegramId?: number;
}): ApiAccount {
  const now = new Date().toISOString();
  const accounts = loadApiAccounts();
  const id = input.email.toLowerCase();
  const existing = accounts.find((account) => account.id === id);

  const updated: ApiAccount = {
    id,
    email: input.email,
    displayName: input.displayName || input.email,
    accessToken: input.accessToken,
    active: true,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    lastUsedAt: now,
  };

  if (input.otpCode) {
    updated.otpCode = input.otpCode;
  } else if (existing?.otpCode) {
    updated.otpCode = existing.otpCode;
  }
  if (input.emailPassword) {
    updated.emailPassword = input.emailPassword;
  } else if (existing?.emailPassword) {
    updated.emailPassword = existing.emailPassword;
  }
  if (input.photoURL) {
    updated.photoURL = input.photoURL;
  } else if (existing?.photoURL) {
    updated.photoURL = existing.photoURL;
  }
  if (existing?.refreshToken) {
    updated.refreshToken = existing.refreshToken;
  }

  const nextAccounts = accounts
    .filter((account) => account.id !== id)
    .map((account) => ({ ...account, active: false }));
  nextAccounts.unshift(updated);
  writeAccounts(nextAccounts);
  syncLegacyToken(updated);
  return updated;
}

export function updateApiAccountTokens(id: string, input: {
  accessToken: string;
  refreshToken?: string;
  displayName?: string;
  email?: string;
}): ApiAccount | null {
  const accounts = loadApiAccounts();
  const existing = accounts.find((account) => account.id === id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const updatedAccounts = accounts.map((account) => {
    if (account.id !== id) {
      return { ...account, active: false };
    }

    const updated: ApiAccount = {
      ...account,
      accessToken: input.accessToken,
      active: true,
      updatedAt: now,
      lastUsedAt: now,
    };
    if (input.refreshToken) updated.refreshToken = input.refreshToken;
    if (input.displayName) updated.displayName = input.displayName;
    if (input.email) updated.email = input.email;
    return updated;
  });

  writeAccounts(updatedAccounts);
  const updated = updatedAccounts.find((account) => account.id === id) ?? null;
  if (updated) syncLegacyToken(updated);
  return updated;
}

export function setActiveApiAccount(id: string): ApiAccount | null {
  const accounts = loadApiAccounts();
  const target = accounts.find((account) => account.id === id);
  if (!target) return null;

  const now = new Date().toISOString();
  const updatedAccounts: ApiAccount[] = accounts.map((account) => {
    const updated: ApiAccount = {
      ...account,
      active: account.id === id,
    };
    if (account.id === id) {
      updated.lastUsedAt = now;
    } else if (account.lastUsedAt) {
      updated.lastUsedAt = account.lastUsedAt;
    }
    return updated;
  });

  writeAccounts(updatedAccounts);
  const active = updatedAccounts.find((account) => account.id === id) ?? null;
  if (active) syncLegacyToken(active);
  return active;
}

export function updateActiveApiToken(accessToken: string, refreshToken?: string): ApiAccount | null {
  const active = getActiveApiAccount();
  if (!active || active.id === "legacy") {
    fs.writeFileSync(LEGACY_ACCESS_TOKEN_FILE, accessToken);
    if (refreshToken) fs.writeFileSync(LEGACY_REFRESH_TOKEN_FILE, refreshToken);
    return null;
  }

  const now = new Date().toISOString();
  const accounts: ApiAccount[] = loadApiAccounts().map((account) => {
    if (account.id !== active.id) return account;
    const updated: ApiAccount = {
      ...account,
      accessToken,
      updatedAt: now,
      lastUsedAt: now,
    };
    if (refreshToken) {
      updated.refreshToken = refreshToken;
    } else if (account.refreshToken) {
      updated.refreshToken = account.refreshToken;
    }
    return updated;
  });

  writeAccounts(accounts);
  const updated = accounts.find((account) => account.id === active.id) ?? null;
  if (updated) syncLegacyToken(updated);
  return updated;
}

export function deleteApiAccount(id: string): ApiAccount[] {
  const accounts = loadApiAccounts().filter((account) => account.id !== id);
  if (accounts.length > 0 && !accounts.some((account) => account.active)) {
    accounts[0] = { ...accounts[0]!, active: true };
    syncLegacyToken(accounts[0]!);
  }
  writeAccounts(accounts);
  return accounts;
}
