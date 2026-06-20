import { NextRequest, NextResponse } from "next/server";
import { createWebSession, createWebUser } from "../../../../lib/web_auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await createWebUser({
      username: String(body.username ?? ""),
      name: String(body.name ?? ""),
      password: String(body.password ?? ""),
      adminCode: String(body.adminCode ?? ""),
    });
    await createWebSession(user.id);
    return NextResponse.json({ ok: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: String(error?.message ?? error) },
      { status: 400 }
    );
  }
}
