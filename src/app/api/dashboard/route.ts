import { NextResponse } from "next/server";
import { loadApiAccounts } from "../../../lib/api_accounts";
import { syncActiveApiBookingsFromAccounts } from "../../../lib/api_bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const accounts = loadApiAccounts().map((account) => ({
    id: account.id,
    email: account.email,
    displayName: account.displayName,
    active: account.active,
    updatedAt: account.updatedAt,
    ...(account.otpCode ? { otpCode: account.otpCode } : {}),
  }));
  const bookings = await syncActiveApiBookingsFromAccounts();

  return NextResponse.json({
    accounts,
    bookings,
    updatedAt: new Date().toISOString(),
  });
}
