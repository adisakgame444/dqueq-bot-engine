import { NextResponse } from "next/server";
import { clearWebSession } from "../../../../lib/web_auth";

export async function POST() {
  await clearWebSession();
  return NextResponse.json({ ok: true });
}
