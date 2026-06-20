"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      username: String(formData.get("username") ?? ""),
      password: String(formData.get("password") ?? ""),
      name: String(formData.get("name") ?? ""),
      adminCode: String(formData.get("adminCode") ?? ""),
    };

    try {
      const res = await fetch(`/api/web-auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "ไม่สำเร็จ");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <div className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">DQueue</p>
            <h1 className="mt-2 text-3xl font-black text-white">
              {isSignup ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {isSignup
                ? "สร้างบัญชีสำหรับเข้าดูหน้าคิวและจัดการสิทธิ์"
                : "เข้าสู่ระบบเพื่อดูรายการคิวที่จองผ่าน API"}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {isSignup && (
              <label className="block">
                <span className="text-xs font-bold text-slate-400">ชื่อ</span>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                  placeholder="ชื่อผู้ใช้"
                />
              </label>
            )}

            <label className="block">
              <span className="text-xs font-bold text-slate-400">ไอดีผู้ใช้</span>
              <input
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={32}
                pattern="[A-Za-z0-9._-]+"
                autoCapitalize="none"
                autoComplete="username"
                className="mt-1 w-full rounded border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                placeholder="เช่น dqueq01"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold text-slate-400">รหัสผ่าน</span>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                placeholder="อย่างน้อย 6 ตัวอักษร"
              />
            </label>

            {isSignup && (
              <label className="block">
                <span className="text-xs font-bold text-slate-400">รหัสแอดมิน</span>
                <input
                  name="adminCode"
                  className="mt-1 w-full rounded border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                  placeholder="ใส่เฉพาะถ้าต้องการสมัครเป็นแอดมิน"
                />
              </label>
            )}

            {error && (
              <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "กำลังทำรายการ..." : isSignup ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-400">
            {isSignup ? "มีบัญชีแล้ว?" : "ยังไม่มีบัญชี?"}{" "}
            <Link className="font-bold text-cyan-300 hover:text-cyan-200" href={isSignup ? "/login" : "/signup"}>
              {isSignup ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
