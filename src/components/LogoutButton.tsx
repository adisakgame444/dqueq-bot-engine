"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/web-auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="rounded border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-200 disabled:opacity-60"
    >
      {loading ? "ออกจากระบบ..." : "ออกจากระบบ"}
    </button>
  );
}
