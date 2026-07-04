import { NextRequest, NextResponse } from "next/server";
import { loadApiAccountsDb } from "../../../lib/api_accounts";
import { syncActiveApiBookingsFromAccounts } from "../../../lib/api_bookings";
import { getEmailCloneMap } from "../../../lib/email_clone_map";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const accounts = (await loadApiAccountsDb()).map((account) => ({
    id: account.id,
    email: account.email,
    displayName: account.displayName,
    active: account.active,
    updatedAt: account.updatedAt,
    ...(account.otpCode ? { otpCode: account.otpCode } : {}),
  }));
  const bookings = await syncActiveApiBookingsFromAccounts();
  const emailCloneMap = getEmailCloneMap();

  const { searchParams } = new URL(req.url);
  const queryAgent = searchParams.get("agent");

  let localAccounts: any[] = [];
  let localError = false;

  try {
    const agentPort = process.env.REMOTE_ANDROID_PORT || "5100";
    const agentHost = process.env.REMOTE_ANDROID_HOST || "127.0.0.1";
    
    // Parse target base agent url from query parameter or fallback
    const base = queryAgent ? queryAgent.replace(/\/+$/, "") : `http://${agentHost}:${agentPort}`;
    const agentRes = await fetch(`${base}/api/accounts`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (agentRes.ok) {
      const agentData = await agentRes.json();
      localAccounts = agentData.accounts || [];
    } else {
      localError = true;
    }
  } catch (err) {
    localError = true;
  }

  return NextResponse.json({
    accounts,
    bookings,
    emailCloneMap,
    localAccounts,
    localError,
    updatedAt: new Date().toISOString(),
  });
}
