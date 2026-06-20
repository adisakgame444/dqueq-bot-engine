import { NextRequest, NextResponse } from "next/server";
import { createWebSession, verifyWebUser } from "../../../../lib/web_auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await verifyWebUser(String(body.username ?? ""), String(body.password ?? ""));
    await createWebSession(user.id);
    return NextResponse.json({ ok: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 401 }
    );
  }
}
