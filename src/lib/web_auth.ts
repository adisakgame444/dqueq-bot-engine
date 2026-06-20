import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE = "dqueue_web_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type WebUserRole = "USER" | "ADMIN";

export type CurrentWebUser = {
  id: string;
  username: string;
  name: string;
  role: WebUserRole;
  createdAt: Date;
  updatedAt: Date;
};

function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")): string {
  const derived = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `pbkdf2:${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [, salt, derived] = stored.split(":");
  if (!salt || !derived) return false;
  const candidate = hashPassword(password, salt).split(":")[2] ?? "";
  if (candidate.length !== derived.length) return false;
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(derived));
}

export async function createWebUser(input: {
  username: string;
  name: string;
  password: string;
  adminCode?: string;
}): Promise<CurrentWebUser> {
  const username = normalizeUsername(input.username);
  const name = input.name.trim();
  const password = input.password.trim();
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    throw new Error("ไอดีต้องเป็น a-z, 0-9, จุด, ขีดล่าง หรือขีดกลาง 3-32 ตัว");
  }
  if (!name) throw new Error("กรุณาใส่ชื่อ");
  if (password.length < 6) throw new Error("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");

  const existing = await prisma.webUser.findUnique({ where: { username } });
  if (existing) throw new Error("ไอดีนี้สมัครไว้แล้ว");

  const adminCode = process.env.WEB_ADMIN_SIGNUP_CODE || "Dqueq999";
  const role: WebUserRole = input.adminCode?.trim() === adminCode ? "ADMIN" : "USER";

  return prisma.webUser.create({
    data: {
      username,
      name,
      passwordHash: hashPassword(password),
      role,
    },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function verifyWebUser(usernameInput: string, password: string): Promise<CurrentWebUser> {
  const username = normalizeUsername(usernameInput);
  const user = await prisma.webUser.findUnique({ where: { username } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("ไอดีหรือรหัสผ่านไม่ถูกต้อง");
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function createWebSession(userId: string): Promise<void> {
  const token = crypto.randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS);

  await prisma.webSession.deleteMany({ where: { userId } });
  await prisma.webSession.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentWebUser(): Promise<CurrentWebUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.webSession.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt.getTime() <= Date.now()) {
    if (session) await prisma.webSession.delete({ where: { id: session.id } });
    return null;
  }

  return {
    id: session.user.id,
    username: session.user.username,
    name: session.user.name,
    role: session.user.role,
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
  };
}

export async function clearWebSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.webSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(SESSION_COOKIE);
}
