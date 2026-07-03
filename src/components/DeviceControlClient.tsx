"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DeviceControlClientProps {
  cloneId: number;
}

export default function DeviceControlClient({ cloneId }: DeviceControlClientProps) {
  const router = useRouter();
  const [decoders, setDecoders] = useState<any>(null);
  const [localAccounts, setLocalAccounts] = useState<any[]>([]);
  const [agentUrl, setAgentUrl] = useState<string>("http://127.0.0.1:5100");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dqueue_agent_url") || "http://127.0.0.1:5100";
      setAgentUrl(saved);
    }
  }, []);

  const [streamActive, setStreamActive] = useState(false);
  const [statusText, setStatusText] = useState("Connecting");
  const [fps, setFps] = useState(0);
  const [lastAction, setLastAction] = useState("");
  const [inputText, setInputText] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const decoderRef = useRef<any>(null);
  const decoderWriterRef = useRef<any>(null);
  const lastFramesRenderedRef = useRef(0);
  const fpsIntervalRef = useRef<any>(null);
  const stoppedRef = useRef(false);

  const DEVICE_WIDTH = 900;
  const DEVICE_HEIGHT = 1920;
  const H264_CODEC = 1748121140;

  const agentHttp = agentUrl.replace(/\/+$/, "");
  const agentWs = agentHttp.replace(/^https:/, "wss:").replace(/^http:/, "ws:");
  const apiBase = `${agentHttp}/api/account/${cloneId}`;

  // 1. Dynamic import of WebCodecs stream decoder modules
  useEffect(() => {
    import("@yume-chan/scrcpy-decoder-webcodecs")
      .then((mod) => {
        setDecoders(mod);
      })
      .catch((err) => {
        console.error("Failed to load @yume-chan/scrcpy-decoder-webcodecs dynamically:", err);
        setStatusText("Decoder Error");
      });
  }, []);

  // 2. Fetch active local accounts list from agent url
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch(`${agentHttp}/api/accounts`, { cache: "no-store" });
        const resData = await res.json();
        if (active && resData.ok) {
          setLocalAccounts(resData.accounts || []);
        }
      } catch (err) {
        console.error("Failed to fetch accounts list:", err);
      }
    }
    load();
    const interval = setInterval(load, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [agentHttp]);

  // 3. Connect to scrcpy websocket server
  useEffect(() => {
    if (!decoders) return;

    stoppedRef.current = false;
    let fallbackTimer: any;
    let waitingForKeyframe = true;

    function startFpsCounter() {
      if (fpsIntervalRef.current) clearInterval(fpsIntervalRef.current);
      lastFramesRenderedRef.current = decoderRef.current ? decoderRef.current.framesRendered : 0;
      fpsIntervalRef.current = setInterval(() => {
        if (decoderRef.current) {
          const currentFrames = decoderRef.current.framesRendered;
          const currentFps = currentFrames - lastFramesRenderedRef.current;
          lastFramesRenderedRef.current = currentFrames;
          setFps(currentFps);
        }
      }, 1000);
    }

    function stopFpsCounter() {
      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
        fpsIntervalRef.current = null;
      }
      setFps(0);
    }

    async function disposeDecoder() {
      try {
        decoderWriterRef.current?.releaseLock();
      } catch (e) {
        // Ignore lock release warnings
      }
      decoderWriterRef.current = undefined;
      decoderRef.current?.dispose();
      decoderRef.current = undefined;
      stopFpsCounter();
    }

    function connect() {
      if (!("VideoDecoder" in window) || !decoders.WebCodecsVideoDecoder.isSupported) {
        setStatusText("WebCodecs is not supported in this browser");
        setStreamActive(false);
        return;
      }

      setStatusText("Connecting");
      setStreamActive(false);

      const wsUrl = `${agentWs}/scrcpy/${cloneId}`;
      const socket = new WebSocket(wsUrl);
      socket.binaryType = "arraybuffer";
      socketRef.current = socket;

      socket.addEventListener("message", async (event) => {
        if (typeof event.data === "string") {
          const message = JSON.parse(event.data);
          if (message.type === "state" && message.state === "error") {
            setStatusText(message.detail || "Stream error");
            setStreamActive(false);
            socket.close();
          }
          if (message.type === "metadata") {
            if (message.codec !== H264_CODEC) {
              setStatusText("Unsupported video codec");
              setStreamActive(false);
              socket.close();
              return;
            }
            await disposeDecoder();
            if (!canvasRef.current) return;
            decoderRef.current = new decoders.WebCodecsVideoDecoder({
              codec: message.codec,
              renderer: new decoders.WebGLVideoFrameRenderer(canvasRef.current),
              hardwareAcceleration: "prefer-hardware",
            });
            decoderWriterRef.current = decoderRef.current.writable.getWriter();
            waitingForKeyframe = true;
          }
          return;
        }

        if (!decoderWriterRef.current) return;
        const raw = new Uint8Array(event.data);
        if (raw.length < 2) return;
        const kind = raw[0];
        const data = raw.slice(1);
        try {
          if (kind === 0) {
            await decoderWriterRef.current.write({ type: "configuration", data });
          } else {
            if (waitingForKeyframe && kind !== 2) return;
            if (kind === 2) waitingForKeyframe = false;
            await decoderWriterRef.current.write({
              type: "data",
              keyframe: kind === 2,
              data,
            });
            if (kind === 2 && !stoppedRef.current) {
              setStreamActive(true);
              setStatusText("Device Online");
              startFpsCounter();
            }
          }
        } catch (error: any) {
          console.error("scrcpy decoder failed", error);
          setStatusText(error.message || "Decode error");
          setStreamActive(false);
          socket.close();
        }
      });

      socket.addEventListener("close", () => {
        disposeDecoder();
        if (!stoppedRef.current) {
          setStatusText("Disconnected. Retrying...");
          setStreamActive(false);
          fallbackTimer = setTimeout(connect, 2000);
        }
      });

      socket.addEventListener("error", () => {
        setStatusText("Unavailable");
        setStreamActive(false);
      });
    }

    connect();

    return () => {
      stoppedRef.current = true;
      clearTimeout(fallbackTimer);
      if (socketRef.current) {
        socketRef.current.close();
      }
      disposeDecoder();
    };
  }, [decoders, cloneId, agentWs]);

  // 4. Input Actions (Tap, Swipe, Keystrokes)
  async function apiInput(payload: any) {
    try {
      const response = await fetch(`${apiBase}/input`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
    } catch (err: any) {
      console.error(err);
      setLastAction(`Error: ${err.message}`);
    }
  }

  // Translate client coordinates on the stream canvas to device resolution coordinates
  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.focus();
    const rect = canvas.getBoundingClientRect();
    const startX = Math.round(((e.clientX - rect.left) / rect.width) * DEVICE_WIDTH);
    const startY = Math.round(((e.clientY - rect.top) / rect.height) * DEVICE_HEIGHT);
    const startTime = Date.now();

    canvas.setPointerCapture(e.pointerId);

    const handlePointerUp = async (upEv: PointerEvent) => {
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
      const endX = Math.round(((upEv.clientX - rect.left) / rect.width) * DEVICE_WIDTH);
      const endY = Math.round(((upEv.clientY - rect.top) / rect.height) * DEVICE_HEIGHT);
      const endTime = Date.now();

      const distance = Math.hypot(endX - startX, endY - startY);
      if (distance < 18) {
        setLastAction(`Tap: ${endX}, ${endY}`);
        await apiInput({ type: "tap", x: endX, y: endY });
      } else {
        const duration = Math.max(100, Math.min(1200, endTime - startTime));
        setLastAction(`Swipe: ${startX},${startY} -> ${endX},${endY}`);
        await apiInput({
          type: "swipe",
          x1: startX,
          y1: startY,
          x2: endX,
          y2: endY,
          duration,
        });
      }
    };

    const handlePointerCancel = () => {
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
    };

    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerCancel);
  }

  // Keypress event handler inside Canvas for Backspace, Enter, Escape keys
  function handleKeyDown(e: React.KeyboardEvent<HTMLCanvasElement>) {
    let payload;
    if (e.key === "Backspace") {
      payload = { type: "key", key: "KEYCODE_DEL" };
    } else if (e.key === "Enter") {
      payload = { type: "key", key: "KEYCODE_ENTER" };
    } else if (e.key === "Escape") {
      payload = { type: "key", key: "KEYCODE_BACK" };
    }
    if (payload) {
      e.preventDefault();
      setLastAction(`Keypress: ${e.key}`);
      apiInput(payload);
    }
  }

  async function handleSendText() {
    if (!inputText) return;
    setLastAction(`Send Text: "${inputText}"`);
    await apiInput({ type: "text", text: inputText });
    setInputText("");
  }

  // Render current active clone details
  const activeClone = localAccounts.find((acc) => acc.id === cloneId);

  return (
    <main className="min-h-screen bg-[#090d16] text-[#f8fafc] font-sans antialiased">
      {/* Top Header Panel */}
      <div className="max-w-[1240px] mx-auto p-4 md:p-6 space-y-4">
        <header className="flex flex-col gap-3 border-b border-[#1e293b] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0e9384]">Admin Console</span>
              <span className="text-slate-500">/</span>
              <span className="text-[10px] font-black uppercase tracking-wide text-amber-500">Remote Screen Control</span>
            </div>
            <h1 className="text-xl font-black text-white mt-1">
              รีโมตควบคุมบอท ({activeClone ? activeClone.name : `Clone ${cloneId}`})
            </h1>
            <p className="text-xs text-slate-400">
              สถานะเครื่อง:{" "}
              <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded-full text-[10px] ml-1 ${
                streamActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}>
                {statusText} {streamActive && `(${fps} FPS)`}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/manager"
              className="rounded-lg border border-[#334155] bg-[#1e293b] px-3.5 py-2 font-black text-slate-300 hover:bg-[#334155] transition"
            >
              📊 กลับแผงควบคุมหลัก
            </Link>
          </div>
        </header>

        {/* Account Swapping Tabs */}
        {localAccounts.length > 0 && (
          <div className="flex flex-wrap gap-1.5 bg-[#0f172a] p-1.5 rounded-xl border border-[#1e293b] text-xs">
            {localAccounts.map((acc) => {
              const isActive = acc.id === cloneId;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => router.push(`/manager/control/${acc.id}`)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    isActive
                      ? "bg-[#ff7900] text-white shadow-md shadow-[#ff7900]/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]"
                  }`}
                >
                  {acc.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Core Layout Split */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,420px)_1fr]">
          
          {/* Left Column: Phone Stream Canvas */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[9/19.2] rounded-[42px] border-[10px] border-[#1e293b] bg-[#020617] shadow-2xl shadow-black/80 overflow-hidden flex flex-col items-center justify-center">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-[#1e293b] rounded-b-2xl z-10 flex items-center justify-center">
                <div className="h-1.5 w-12 bg-slate-800 rounded-full" />
              </div>

              {/* Loader screen when stream is offline */}
              {!streamActive && (
                <div className="absolute inset-0 bg-[#0b0f19] flex flex-col items-center justify-center p-6 text-center z-0">
                  <div className="h-8 w-8 rounded-full border-2 border-[#ff7900] border-t-transparent animate-spin mb-4" />
                  <p className="text-xs text-slate-400 font-medium">กำลังโหลดหรือรอสัญญาณภาพสด...</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide">Status: {statusText}</p>
                </div>
              )}

              {/* Stream Canvas */}
              <canvas
                ref={canvasRef}
                tabIndex={0}
                onPointerDown={handlePointerDown}
                onKeyDown={handleKeyDown}
                className="w-full h-full cursor-pointer focus:outline-none z-1 bg-black"
                style={{ outline: "none" }}
              />

              {/* Floating Stream Mode Indicator overlay */}
              {streamActive && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] text-center font-mono text-emerald-400 tracking-wide z-10 border border-emerald-500/20">
                  ⚡ scrcpy H.264 live ({fps} FPS)
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Android Buttons Control Console */}
          <div className="space-y-4">
            <div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 border-b border-[#1e293b] pb-2">
                แผงควบคุมระบบ Android (ADB Controls)
              </h2>

              {/* Button Groups Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => apiInput({ type: "key", key: "KEYCODE_BACK" })}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#334155] bg-[#1e293b] py-2.5 font-bold text-slate-200 hover:bg-[#334155] transition"
                >
                  ↩️ Back
                </button>
                <button
                  type="button"
                  onClick={() => apiInput({ type: "key", key: "KEYCODE_HOME" })}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#334155] bg-[#1e293b] py-2.5 font-bold text-slate-200 hover:bg-[#334155] transition"
                >
                  🏠 Home
                </button>
                <button
                  type="button"
                  onClick={() => apiInput({ type: "key", key: "KEYCODE_APP_SWITCH" })}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-[#334155] bg-[#1e293b] py-2.5 font-bold text-slate-200 hover:bg-[#334155] transition"
                >
                  📂 Recent Apps
                </button>
                <button
                  type="button"
                  onClick={() => apiInput({ type: "launch" })}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#ff7900] py-2.5 font-black text-white hover:bg-[#e06a00] transition"
                >
                  🟢 เปิดแอป DQueue
                </button>
              </div>

              {/* Force Close App action button */}
              <button
                type="button"
                onClick={() => {
                  if (confirm("ยืนยันสั่งปิดแอป DQueue หรือไม่?")) {
                    apiInput({ type: "close" });
                    setLastAction("Force Closed DQueue");
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-rose-600/10 border border-rose-500/20 py-2.5 text-xs font-black text-rose-400 hover:bg-rose-600/20 transition"
              >
                🔴 สั่งปิดแอป DQueue (Force Close)
              </button>

              {/* Text input to Android device */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] font-bold text-slate-400">
                  ส่งข้อความพิมพ์เข้าจำลอง (Send Text)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendText();
                    }}
                    placeholder="พิมพ์ภาษาไทย อังกฤษ หรือตัวเลข..."
                    className="flex-1 rounded-lg border border-[#334155] bg-[#020617] px-3 py-2 text-xs text-white outline-none focus:border-[#ff7900] transition"
                  />
                  <button
                    type="button"
                    onClick={handleSendText}
                    className="rounded-lg bg-slate-800 border border-slate-700 px-4 text-xs font-bold text-white hover:bg-slate-700 transition"
                  >
                    ส่ง
                  </button>
                </div>
              </div>
            </div>

            {/* Logs console */}
            <div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] p-5 shadow-sm text-xs space-y-2">
              <h3 className="font-bold text-slate-400">บันทึกการส่งคำสั่งล่าสุด (Logs):</h3>
              <p className="font-mono text-[11px] text-amber-400/90 bg-[#020617] p-2.5 rounded-lg min-h-[38px] flex items-center">
                {lastAction ? `> ${lastAction}` : "> พร้อมส่งคำสั่ง..."}
              </p>
            </div>

            {/* Quick Helper guidelines */}
            <div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] p-5 shadow-sm text-xs text-slate-400 space-y-2">
              <h3 className="font-black text-slate-200">💡 คำแนะนำการใช้งานรีโมท</h3>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>คุณสามารถ **ใช้เมาส์คลิกจิ้มหน้าจอ** หรือ **ลากปัดนิ้วเพื่อเลื่อนจอ** บนภาพจำลองมือถือได้โดยตรง</li>
                <li>เมื่อคลิกเลือกที่จอภาพจำลองแล้ว สามารถใช้แป้นพิมพ์ของคอมพิวเตอร์เพื่อควบคุมได้ เช่น กด **Backspace** ลบตัวอักษร, **Enter** ตกลง หรือ **Escape** เพื่อกดย้อนกลับ</li>
                <li>หากภาพค้างหรือไม่ตอบสนอง ให้ลองรีเฟรชหน้าเว็บนี้เพื่อเชื่อมต่อ WebSocket สตรีมใหม่อีกครั้ง</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
