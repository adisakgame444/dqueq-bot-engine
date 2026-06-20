import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import {
  loadApiAccounts,
  saveGoogleApiAccount,
  updateApiAccountTokens,
} from "../../../../../lib/api_accounts";
import { dataFile } from "../../../../../lib/data_dir";
import {
  exchangeGoogleCodeForProfile,
  loginDQueueWithGoogle,
  verifyGoogleOAuthState,
} from "../../../../../lib/google_oauth";

export const runtime = "nodejs";

function html(title: string, body: string, status = 200): NextResponse {
  return new NextResponse(
    `<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #07111f; color: #e6f4ff; padding: 32px; }
    main { max-width: 760px; margin: 0 auto; background: #0d1b2e; border: 1px solid #1e3856; border-radius: 10px; padding: 24px; }
    h1 { margin-top: 0; color: #32e6c5; }
    code { background: #06101d; padding: 2px 6px; border-radius: 4px; word-break: break-all; }
    p { line-height: 1.5; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

function maskToken(token: string): string {
  if (token.length <= 12) return token;
  return `${token.slice(0, 8)}...${token.slice(-6)}`;
}

function maskSecret(value?: string): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-5)}`;
}

function normalizeEmail(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const state = req.nextUrl.searchParams.get("state");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
      return html("Google Login Failed", `<h1>Google login ไม่สำเร็จ</h1><p>${error}</p>`, 400);
    }
    if (!code || !state) {
      return html("Google Login Failed", "<h1>Google login ไม่สำเร็จ</h1><p>Missing code or state.</p>", 400);
    }

    const oauthState = verifyGoogleOAuthState(state);
    const profile = await exchangeGoogleCodeForProfile(code);
    const profileEmail = normalizeEmail(profile.email);

    if (oauthState.mode === "refresh") {
      const targetEmail = normalizeEmail(oauthState.targetEmail);
      if (!targetEmail) {
        return html(
          "Google Refresh Failed",
          "<h1>ต่ออายุ token ไม่สำเร็จ</h1><p>OAuth state ไม่มีอีเมลบัญชีเป้าหมาย</p>",
          400
        );
      }
      if (!profileEmail || profileEmail !== targetEmail) {
        return html(
          "Google Refresh Failed",
          `<h1>ต่ออายุ token ไม่สำเร็จ</h1>
           <p>คุณล็อกอิน Google ผิดบัญชี ระบบจะไม่บันทึก token ทับบัญชีเดิม</p>
           <p>บัญชีที่ต้องการ: <code>${targetEmail}</code></p>
           <p>บัญชีที่ล็อกอินมา: <code>${profile.email ?? "unknown"}</code></p>`,
          400
        );
      }

      const existing = loadApiAccounts().find((account) => account.id === targetEmail);
      if (!existing) {
        return html(
          "Google Refresh Failed",
          `<h1>ต่ออายุ token ไม่สำเร็จ</h1><p>ไม่พบบัญชีเดิมในคลังบัญชี API: <code>${targetEmail}</code></p>`,
          404
        );
      }

      const dqueue = await loginDQueueWithGoogle(profile);
      const account = updateApiAccountTokens(existing.id, {
        accessToken: dqueue.token,
        displayName: profile.name ?? existing.displayName,
        email: profile.email ?? existing.email,
      });

      if (!account) {
        return html("Google Refresh Failed", "<h1>ต่ออายุ token ไม่สำเร็จ</h1><p>บันทึก token ลงบัญชีเดิมไม่ได้</p>", 500);
      }

      fs.writeFileSync(dataFile("extracted_tokens.txt"), dqueue.token);
      const tokenChanged = existing.accessToken !== dqueue.token;

      return html(
        tokenChanged ? "Google Refresh Success" : "Google Token Unchanged",
        `<h1>${tokenChanged ? "ต่ออายุ token สำเร็จ" : "token ยังเป็นตัวเดิม"}</h1>
         <p>${tokenChanged ? "บันทึก token ที่ใช้จองได้ทับบัญชี API เดิมแล้ว" : "DQueue backend คืน token ตัวเดิมกลับมา จึงไม่มี token ใหม่ให้บันทึก"}</p>
         <p>Email: <code>${account.email}</code></p>
         <p>Name: <code>${account.displayName}</code></p>
         <p>OTP code: <code>${maskSecret(account.otpCode)}</code></p>
         <p>ผลลัพธ์: <code>${tokenChanged ? "token changed" : "token unchanged"}</code></p>
         <p>Token ปัจจุบัน: <code>${dqueue.token}</code></p>
         <p>กลับไป Telegram แล้วใช้บัญชีนี้ค้นหา/จองผ่าน API ได้เลย</p>`
      );
    }

    const dqueue = await loginDQueueWithGoogle(profile);
    const accountInput: {
      email: string;
      displayName: string;
      emailPassword?: string;
      otpCode?: string;
      photoURL?: string;
      accessToken: string;
      telegramId?: number;
    } = {
      email: profile.email ?? profile.sub,
      displayName: profile.name ?? profile.email ?? profile.sub,
      accessToken: dqueue.token,
    };
    if (profile.picture) accountInput.photoURL = profile.picture;
    if (typeof oauthState.telegramId === "number") accountInput.telegramId = oauthState.telegramId;
    if (oauthState.otpCode) accountInput.otpCode = oauthState.otpCode;
    if (oauthState.emailPassword) accountInput.emailPassword = oauthState.emailPassword;
    const account = saveGoogleApiAccount(accountInput);

    fs.writeFileSync(dataFile("extracted_tokens.txt"), dqueue.token);

    return html(
      "Google Login Success",
      `<h1>Google login สำเร็จ</h1>
       <p>บันทึกบัญชี API และตั้งเป็นบัญชีที่ใช้งานแล้ว</p>
       <p>Email: <code>${account.email}</code></p>
       <p>Name: <code>${account.displayName}</code></p>
       <p>OTP code: <code>${maskSecret(account.otpCode)}</code></p>
       <p>Token ปัจจุบัน: <code>${dqueue.token}</code></p>
       <p>กลับไป Telegram แล้วใช้เมนูเลือกบัญชีหรือค้นหา/จองผ่าน API ได้เลย</p>`
    );
  } catch (error: any) {
    console.error("Google OAuth callback failed:", error);
    return html(
      "Google Login Failed",
      `<h1>Google login ไม่สำเร็จ</h1><p>${String(error?.message ?? error)}</p>`,
      500
    );
  }
}
