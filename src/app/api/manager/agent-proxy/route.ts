import { NextRequest, NextResponse } from "next/server";
import { getCurrentWebUser } from "../../../../lib/web_auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. Verify admin authentication state
  const user = await getCurrentWebUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path, method, body, agentUrl } = await req.json();
    if (!path) {
      return NextResponse.json({ ok: false, error: "path parameter is required" }, { status: 400 });
    }

    const agentPort = process.env.REMOTE_ANDROID_PORT || "5100";
    const agentHost = process.env.REMOTE_ANDROID_HOST || "127.0.0.1";
    
    // Use the custom agent URL if provided by the client's localStorage configuration, fallback to local loopback
    const base = agentUrl ? agentUrl.replace(/\/+$/, "") : `http://${agentHost}:${agentPort}`;
    const targetUrl = `${base}${path}`;

    // Build RequestInit properties dynamically to support strict exactOptionalPropertyTypes compilation settings
    const fetchOptions: RequestInit = {
      method: method || "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(targetUrl, fetchOptions);
    const resData = await res.json();
    return NextResponse.json(resData, { status: res.status });
  } catch (err: any) {
    console.error("Local Agent Proxy Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
