import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import {
  loadApiAccountsDb,
  saveGoogleApiAccount,
  updateApiAccountTokens,
} from "../../../../../lib/api_accounts";
import { dataFile } from "../../../../../lib/data_dir";
import {
  loginDQueueWithGoogle,
  verifyGoogleOAuthState,
} from "../../../../../lib/google_oauth";
import { setEmailClone } from "../../../../../lib/email_clone_map";

export const runtime = "nodejs";

function normalizeEmail(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

function maskSecret(value?: string): string {
  if (!value) return "-";
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-5)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const state = String(body?.state ?? "");
    const uid = String(body?.uid ?? "");
    const email = String(body?.email ?? "");
    const displayName = String(body?.displayName ?? email ?? uid);
    const photoURL = typeof body?.photoURL === "string" ? body.photoURL : undefined;

    if (!state || !uid) {
      return NextResponse.json({ ok: false, error: "Missing state or Firebase UID" }, { status: 400 });
    }

    const oauthState = verifyGoogleOAuthState(state);
    const profileEmail = normalizeEmail(email);

    if (oauthState.mode === "refresh") {
      const targetEmail = normalizeEmail(oauthState.targetEmail);
      if (!targetEmail) {
        return NextResponse.json({ ok: false, error: "Refresh state has no target email" }, { status: 400 });
      }
      if (!profileEmail || profileEmail !== targetEmail) {
        return NextResponse.json(
          {
            ok: false,
            error: "Google email does not match target account",
            targetEmail,
            loginEmail: email || "unknown",
          },
          { status: 400 }
        );
      }

      const existing = (await loadApiAccountsDb()).find((account) => account.id === targetEmail);
      if (!existing) {
        return NextResponse.json({ ok: false, error: `Account not found: ${targetEmail}` }, { status: 404 });
      }

      const oldToken = existing.accessToken;
      const dqueue = await loginDQueueWithGoogle({
        sub: uid,
        name: displayName,
        email,
        picture: photoURL,
      });

      const account = await updateApiAccountTokens(existing.id, {
        accessToken: dqueue.token,
        displayName: displayName || existing.displayName,
        email: email || existing.email,
      });
      if (!account) {
        return NextResponse.json({ ok: false, error: "Failed to update account token" }, { status: 500 });
      }

      fs.writeFileSync(dataFile("extracted_tokens.txt"), dqueue.token);
      return NextResponse.json({
        ok: true,
        mode: "refresh",
        firebaseUid: uid,
        email: account.email,
        displayName: account.displayName,
        otpCode: maskSecret(account.otpCode),
        tokenChanged: oldToken !== dqueue.token,
        token: dqueue.token,
      });
    }

    if (oauthState.mode === "clone_login") {
      const cloneAccountId = oauthState.cloneAccountId;
      if (email && cloneAccountId) {
        setEmailClone(email, cloneAccountId);
      }
      const dqueue = await loginDQueueWithGoogle({
        sub: uid,
        name: displayName,
        email,
        picture: photoURL,
      });

      let userId: number | undefined = undefined;
      try {
        const parts = dqueue.token.split(".");
        if (parts.length === 3 && parts[1]) {
          const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
          userId = payload.user_id || payload.id;
        }
      } catch (e) {
        console.error("Failed to parse JWT token payload:", e);
      }

      const userObject = {
        user_id: userId,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        token: dqueue.token,
      };

      return NextResponse.json({
        ok: true,
        mode: "clone_login",
        cloneAccountId,
        token: dqueue.token,
        user: userObject,
      });
    }

    const dqueue = await loginDQueueWithGoogle({
      sub: uid,
      name: displayName,
      email,
      picture: photoURL,
    });

    const accountInput: {
      email: string;
      displayName: string;
      emailPassword?: string;
      otpCode?: string;
      photoURL?: string;
      accessToken: string;
      telegramId?: number;
    } = {
      email: email || uid,
      displayName: displayName || email || uid,
      accessToken: dqueue.token,
    };
    if (photoURL) accountInput.photoURL = photoURL;
    if (typeof oauthState.telegramId === "number") accountInput.telegramId = oauthState.telegramId;
    if (oauthState.otpCode) accountInput.otpCode = oauthState.otpCode;
    if (oauthState.emailPassword) accountInput.emailPassword = oauthState.emailPassword;

    const previous = (await loadApiAccountsDb()).find((account) => account.id === normalizeEmail(accountInput.email));
    const account = await saveGoogleApiAccount(accountInput);

    fs.writeFileSync(dataFile("extracted_tokens.txt"), dqueue.token);
    return NextResponse.json({
      ok: true,
      mode: "add",
      firebaseUid: uid,
      email: account.email,
      displayName: account.displayName,
      otpCode: maskSecret(account.otpCode),
      tokenChanged: previous?.accessToken !== dqueue.token,
      token: dqueue.token,
    });
  } catch (error: any) {
    console.error("Firebase Google complete failed:", error);
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}
