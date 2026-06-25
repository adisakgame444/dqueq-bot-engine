import { NextRequest, NextResponse } from "next/server";
import { getGoogleOAuthStartUrl } from "../../../../../lib/google_oauth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const cloneAccountIdStr = req.nextUrl.searchParams.get("cloneAccountId");
    if (!cloneAccountIdStr) {
      return NextResponse.json({ ok: false, error: "Missing cloneAccountId parameter" }, { status: 400 });
    }
    const cloneAccountId = Number(cloneAccountIdStr);
    if (isNaN(cloneAccountId)) {
      return NextResponse.json({ ok: false, error: "Invalid cloneAccountId parameter" }, { status: 400 });
    }

    const redirectUrl = getGoogleOAuthStartUrl(undefined, undefined, {
      mode: "clone_login",
      cloneAccountId,
    });

    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error("Start clone redirect failed:", error);
    return NextResponse.json({ ok: false, error: error.message || String(error) }, { status: 500 });
  }
}
