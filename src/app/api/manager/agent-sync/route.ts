import { NextRequest, NextResponse } from "next/server";
import { getActiveAgentTunnel, saveActiveAgentTunnel } from "../../../../lib/active_agent_tunnel";

export const dynamic = "force-dynamic";

export async function GET() {
  const tunnel = getActiveAgentTunnel();
  return NextResponse.json({
    ok: true,
    activeUrl: tunnel.url,
    updatedAt: tunnel.updatedAt,
  }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url || body.tunnelUrl || body.publicOrigin;
    if (!url) {
      return NextResponse.json({ ok: false, error: "url is required" }, { status: 400 });
    }
    const saved = saveActiveAgentTunnel(url);
    return NextResponse.json({
      ok: true,
      activeUrl: saved.url,
      updatedAt: saved.updatedAt,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
