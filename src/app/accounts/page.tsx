"use client";

import { useEffect, useMemo, useState } from "react";

type Account = {
  id: number;
  name: string;
  packageName: string;
  enabled: boolean;
  protected?: boolean;
  installed?: boolean;
  session?: { state?: string } | null;
  url: string;
  appUrl: string;
  appIosUrl?: string;
};

type AccountsResponse = {
  ok: boolean;
  busy?: boolean;
  accounts?: Account[];
  publicOrigin?: string;
  error?: string;
};

const DEFAULT_AGENT_ORIGIN =
  process.env.NEXT_PUBLIC_REMOTE_AGENT_URL || "https://remote.bothero.online";
const PUBLIC_WEB_ORIGIN =
  process.env.NEXT_PUBLIC_PUBLIC_WEB_URL || "";

async function request<T>(agentUrl: string, path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${agentUrl.replace(/\/+$/, "")}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  const data = (await response.json()) as T & { ok?: boolean; error?: string };
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

function publicOrigin() {
  if (PUBLIC_WEB_ORIGIN) return PUBLIC_WEB_ORIGIN.replace(/\/+$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function badge(text: string, className = "") {
  return <span className={`badge ${className}`}>{text}</span>;
}

export default function AccountsPage() {
  const [agentUrl, setAgentUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      // 1. ดึงจาก Query Parameter (?agent=...)
      const urlParams = new URLSearchParams(window.location.search);
      const queryAgent = urlParams.get("agent");
      if (queryAgent) {
        localStorage.setItem("dqueue_agent_url", queryAgent);
        return queryAgent;
      }
      // 2. ดึงจาก localStorage
      const saved = localStorage.getItem("dqueue_agent_url");
      if (saved) return saved;
      // 3. หากเข้าจากเว็บกลาง bothero.online ให้วิ่งหาพอร์ตเครื่องจำลองตัวเอง (127.0.0.1:5100)
      if (window.location.hostname === "www.bothero.online" || window.location.hostname === "bothero.online") {
        return "http://127.0.0.1:5100";
      }
      return window.location.origin;
    }
    return "http://127.0.0.1:5100";
  });

  const [inputUrl, setInputUrl] = useState(agentUrl);
  const [showSettings, setShowSettings] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const [agentPublicOrigin, setAgentPublicOrigin] = useState<string>("");

  const webOrigin = useMemo(publicOrigin, []);

  const shareableAgentUrl = useMemo(() => {
    if (agentPublicOrigin) return agentPublicOrigin;
    return agentUrl;
  }, [agentPublicOrigin, agentUrl]);

  async function loadAccounts() {
    try {
      const data = await request<AccountsResponse>(agentUrl, "/api/accounts");
      setBusy(Boolean(data.busy));
      setAccounts(data.accounts || []);
      if (data.publicOrigin) {
        setAgentPublicOrigin(data.publicOrigin);
      }
      if (error) {
        setNotice("");
        setError(false);
      }
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "โหลดบัญชีไม่สำเร็จ");
      setError(true);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dqueue_agent_url");
      if (!saved && agentUrl) {
        localStorage.setItem("dqueue_agent_url", agentUrl);
      }
    }
  }, [agentUrl]);

  useEffect(() => {
    loadAccounts();
    const timer = window.setInterval(() => {
      if (!busy) loadAccounts();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [busy, agentUrl]);

  async function copyLink(account: Account) {
    const link = `${webOrigin}/app-ios/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`;
    await navigator.clipboard.writeText(link);
    setNotice(`คัดลอกลิงก์ ${account.name} แล้ว: ${link}`);
    setError(false);
  }

  async function perform(action: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setNotice("");
    setError(false);
    try {
      await action();
      await loadAccounts();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "ทำรายการไม่สำเร็จ");
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <header>
        <div>
          <h1>จัดการบัญชี DQueue</h1>
          <p className="subtitle">
            หน้าเว็บนี้อยู่บน Vercel แต่เชื่อมต่อระบบจริงผ่าน Local Agent
          </p>
        </div>
        <div className="toolbar">
          <a href={`/app-ios/1?agent=${encodeURIComponent(shareableAgentUrl)}`} target="_blank" rel="noreferrer">
            เปิด Account 1
          </a>
          <button
            type="button"
            className="primary"
            disabled={busy}
            onClick={() =>
              perform(async () => {
                setNotice("กำลังสร้างและติดตั้งบัญชีใหม่...");
                const data = await request<{ ok: boolean; account: Account }>(
                  agentUrl,
                  "/api/accounts",
                  { method: "POST", body: "{}" }
                );
                setNotice(`${data.account.name} พร้อมใช้งานแล้ว`);
              })
            }
          >
            + เพิ่มบัญชี
          </button>
        </div>
      </header>

      {/* แถบการตั้งค่า Local Agent ของแต่ละเครื่อง */}
      <div className="agent-settings-bar" style={{ marginBottom: "16px", display: "flex", gap: "10px", alignItems: "center", background: "#111827", padding: "10px 14px", borderRadius: "12px", border: "1px solid #1e293b" }}>
        <span style={{ fontSize: "13px", color: "#94a3b8" }}>
          🔗 <strong>การเชื่อมต่อ:</strong> Local Agent ปัจจุบันชี้ไปที่ <code style={{ color: "#38bdf8", background: "#1e293b", padding: "2px 6px", borderRadius: "4px" }}>{agentUrl}</code>
        </span>
        <button
          type="button"
          style={{ minHeight: "30px", fontSize: "12px", padding: "0 10px" }}
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? "ปิดการตั้งค่า" : "แก้ไขที่อยู่เชื่อมต่อ"}
        </button>
      </div>

      {showSettings && (
        <div className="agent-settings-panel" style={{ marginBottom: "16px", background: "#0f172a", padding: "16px", borderRadius: "12px", border: "1px solid #ff7900" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: "14px" }}>ระบุที่อยู่ของเครื่องจำลอง (Local Agent URL)</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="เช่น http://127.0.0.1:5100 หรือลิงก์ Cloudflare Tunnel ของท่าน"
              style={{
                flex: 1,
                background: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#fff",
                font: "inherit",
                fontSize: "13px"
              }}
            />
            <button
              type="button"
              className="primary"
              style={{ minHeight: "36px", fontSize: "13px" }}
              onClick={() => {
                const normalized = inputUrl.trim();
                localStorage.setItem("dqueue_agent_url", normalized);
                setAgentUrl(normalized);
                setShowSettings(false);
                setNotice("เปลี่ยนที่อยู่เชื่อมต่อ Local Agent สำเร็จ");
                setError(false);
              }}
            >
              บันทึก
            </button>
          </div>
          <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "11px" }}>
            * ระบบเริ่มต้นจะเชื่อมต่อไปยังเครื่องของคุณเองที่ http://127.0.0.1:5100 หากต้องการเข้าคุมหน้าจอคิวจำลองจากภายนอกบ้านหรือมือถือ ให้ใส่ลิงก์ Cloudflare Tunnel ของเครื่องท่านลงในนี้
          </p>
        </div>
      )}

      {notice ? (
        <div className={`notice visible${error ? " error" : ""}`}>{notice}</div>
      ) : null}

      <section className="accounts">
        {accounts.length ? (
          accounts.map((account) => {
            const sessionState = account.session?.state || "stopped";
            const publicLink = `${webOrigin}/app-ios/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`;
            return (
              <article className="card" key={account.id}>
                <div className="account-top">
                  <h2>{account.name}</h2>
                  <div className="badges">
                    {badge(account.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน", account.enabled ? "online" : "disabled")}
                    {badge(account.installed ? "ติดตั้งแล้ว" : "ไม่พบแอป")}
                    {badge(`session: ${sessionState}`)}
                  </div>
                </div>

                <div className="details">
                  <div className="detail-row">
                    <span className="detail-label">หน้าแอป iOS</span>
                    <span className="detail-value">{`${webOrigin}/app-ios/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">หน้าแอป Android</span>
                    <span className="detail-value">{`${webOrigin}/app/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ลิงก์ส่งให้คนอื่น</span>
                    <span className="detail-value public">{publicLink}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Local Agent</span>
                    <span className="detail-value">{agentUrl}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Package</span>
                    <span className="detail-value">{account.packageName}</span>
                  </div>
                </div>

                <div className="actions">
                  <a href={`/app/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`} target="_blank" rel="noreferrer">
                    เปิดหน้าแอป Android
                  </a>
                  <a href={`/app-ios/${account.id}?agent=${encodeURIComponent(shareableAgentUrl)}`} target="_blank" rel="noreferrer">
                    เปิดหน้าแอป iOS
                  </a>
                  {account.id !== 1 ? (
                    <a
                      href={`/api/auth/google/start-clone?cloneAccountId=${account.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ borderColor: "#4ade80", color: "#4ade80", background: "rgba(74, 222, 128, 0.05)" }}
                    >
                      เชื่อมต่อ Google (Login)
                    </a>
                  ) : null}
                  <button type="button" disabled={busy} onClick={() => copyLink(account)}>
                    คัดลอกลิงก์ส่งให้คนอื่น
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      perform(async () => {
                        await request(
                          agentUrl,
                          `/api/accounts/${account.id}`,
                          {
                            method: "PATCH",
                            body: JSON.stringify({ enabled: !account.enabled }),
                          }
                        );
                        setNotice(`${account.enabled ? "ปิด" : "เปิด"} ${account.name} แล้ว`);
                      })
                    }
                  >
                    {account.enabled ? "ปิดใช้งาน" : "เปิดใช้งาน"}
                  </button>
                  {!account.protected ? (
                    <button
                      type="button"
                      className="danger"
                      disabled={busy}
                      onClick={() => {
                        const required = `DELETE ACCOUNT ${account.id}`;
                        const confirmation = window.prompt(
                          `พิมพ์ ${required} เพื่อยืนยันการลบ`
                        );
                        if (confirmation !== required) return;
                        perform(async () => {
                          await request(
                            agentUrl,
                            `/api/accounts/${account.id}`,
                            {
                              method: "DELETE",
                              body: JSON.stringify({ confirm: confirmation }),
                            }
                          );
                          setNotice(`ลบ ${account.name} แล้ว`);
                        });
                      }}
                    >
                      ลบถาวร
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty">กำลังโหลดรายการบัญชี...</div>
        )}
      </section>

      <style>{`
        :global(body) {
          margin: 0;
          min-height: 100vh;
          background: radial-gradient(circle at 20% 0%, rgba(255, 111, 0, 0.16), transparent 32rem), #080b12;
          color: #f8fafc;
        }
        main {
          width: min(1120px, calc(100vw - 28px));
          margin: 0 auto;
          padding: 28px 0 48px;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        h1 { margin: 0; font-size: 24px; }
        .subtitle { margin: 6px 0 0; color: #94a3b8; font-size: 13px; }
        button, a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #2b3749;
          border-radius: 10px;
          min-height: 40px;
          padding: 0 14px;
          color: #cbd5e1;
          background: #172033;
          text-decoration: none;
          font: inherit;
          font-weight: 800;
          white-space: nowrap;
          cursor: pointer;
        }
        button:hover, a:hover { border-color: #ff8a1f; background: #202b40; }
        button:disabled { cursor: wait; opacity: 0.55; }
        .primary { border-color: #ff7900; background: #ff7900; color: #1b0b00; }
        .danger { border-color: #7f1d1d; background: #3f1118; color: #fecaca; }
        .toolbar, .actions, .badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .notice {
          margin-bottom: 16px;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 12px 14px;
          background: #111827;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.6;
        }
        .notice.error { border-color: #7f1d1d; color: #fecaca; }
        .accounts { display: grid; gap: 12px; }
        .card {
          border: 1px solid #202a39;
          border-radius: 16px;
          padding: 18px;
          background: rgba(15, 20, 30, 0.92);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.25);
        }
        .account-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
        }
        .card h2 { margin: 0; font-size: 17px; }
        .details { display: grid; gap: 6px; margin: 14px 0 0; color: #94a3b8; font-size: 12px; }
        .detail-row { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 12px; align-items: start; }
        .detail-label { color: #64748b; font-weight: 800; }
        .detail-value { color: #bfdbfe; overflow-wrap: anywhere; }
        .detail-value.public { color: #fbbf24; font-weight: 800; }
        .badge {
          border: 1px solid #334155;
          border-radius: 999px;
          padding: 4px 8px;
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 800;
        }
        .badge.online { border-color: #166534; color: #86efac; }
        .badge.disabled { border-color: #92400e; color: #fcd34d; }
        .badges { justify-content: flex-end; }
        .actions {
          justify-content: flex-start;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #202a39;
        }
        .empty { color: #94a3b8; text-align: center; padding: 50px 0; }
        @media (max-width: 700px) {
          header, .account-top { display: block; }
          .toolbar, .actions { margin-top: 14px; }
          .badges { justify-content: flex-start; margin-top: 10px; }
          .detail-row { grid-template-columns: 1fr; gap: 2px; }
          button, a { width: 100%; }
        }
      `}</style>
    </main>
  );
}
