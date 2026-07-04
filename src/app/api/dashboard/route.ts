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
  let mergedEmailCloneMap = { ...emailCloneMap };

  try {
    const agentPort = process.env.REMOTE_ANDROID_PORT || "5100";
    const agentHost = process.env.REMOTE_ANDROID_HOST || "127.0.0.1";
    
    // Parse target base agent url from query parameter or fallback
    let base = queryAgent ? queryAgent.replace(/\/+$/, "") : `http://${agentHost}:${agentPort}`;
    
    // Check if the current Next.js server handling the request is the remote production server (bothero.online)
    const host = req.headers.get("host") || "";
    const isRemoteProduction = host.includes("bothero.online") && !host.includes("localhost") && !host.includes("127.0.0.1");
    
    // If running on production server and attempting to resolve local agent, auto-redirect to the secure Cloudflare tunnel domain
    if (isRemoteProduction && (base.includes("127.0.0.1") || base.includes("localhost"))) {
      base = "https://remote.bothero.online";
    }

    const agentRes = await fetch(`${base}/api/accounts`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (agentRes.ok) {
      const agentData = await agentRes.json();
      localAccounts = agentData.accounts || [];
      if (agentData.emailCloneMap) {
        mergedEmailCloneMap = { ...mergedEmailCloneMap, ...agentData.emailCloneMap };
      }
    } else {
      localError = true;
    }
  } catch (err) {
    localError = true;
  }

  return NextResponse.json({
    accounts,
    bookings,
    emailCloneMap: mergedEmailCloneMap,
    localAccounts,
    localError,
    updatedAt: new Date().toISOString(),
  });
}
