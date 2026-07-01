import { NextResponse } from "next/server";
import { loadApiAccountsDb } from "../../../lib/api_accounts";
import { syncActiveApiBookingsFromAccounts } from "../../../lib/api_bookings";
import { getEmailCloneMap } from "../../../lib/email_clone_map";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
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

  return NextResponse.json({
    accounts,
    bookings,
    emailCloneMap,
    updatedAt: new Date().toISOString(),
  });
}
