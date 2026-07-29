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
    let base = agentUrl ? agentUrl.replace(/\/+$/, "") : `http://${agentHost}:${agentPort}`;
    
    // Check if the current Next.js server handling the request is the remote production server (bothero.online)
    const host = req.headers.get("host") || "";
    const isRemoteProduction = host.includes("bothero.online") && !host.includes("localhost") && !host.includes("127.0.0.1");

    // If running on production server and attempting to resolve local agent, auto-redirect to the secure Cloudflare tunnel domain
    if (isRemoteProduction && (base.includes("127.0.0.1") || base.includes("localhost"))) {
      base = "https://remote.bothero.online";
    }

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

    let res;
    try {
      res = await fetch(targetUrl, fetchOptions);
    } catch (primaryErr: any) {
      const fallbackUrl = `http://${agentHost}:${agentPort}${path}`;
      if (targetUrl !== fallbackUrl) {
        console.warn(`Primary proxy fetch to ${targetUrl} failed (${primaryErr?.message}), trying local fallback ${fallbackUrl}`);
        res = await fetch(fallbackUrl, fetchOptions);
      } else {
        throw primaryErr;
      }
    }
    const resData = await res.json();
    return NextResponse.json(resData, { status: res.status });
  } catch (err: any) {
    console.error("Local Agent Proxy Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
