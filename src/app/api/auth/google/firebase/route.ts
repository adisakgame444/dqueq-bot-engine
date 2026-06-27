import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function html(body: string): NextResponse {
  return new NextResponse(
    `<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DQueue Firebase Google Login</title>
  <style>
    body { font-family: Arial, sans-serif; background: #07111f; color: #e6f4ff; padding: 32px; }
    main { max-width: 760px; margin: 0 auto; background: #0d1b2e; border: 1px solid #1e3856; border-radius: 10px; padding: 24px; }
    h1 { margin-top: 0; color: #32e6c5; }
    button { background: #32e6c5; border: 0; border-radius: 8px; color: #06101d; cursor: pointer; font-size: 16px; font-weight: 700; padding: 12px 16px; }
    code, pre { background: #06101d; border-radius: 4px; word-break: break-all; }
    code { padding: 2px 6px; }
    pre { overflow: auto; padding: 12px; white-space: pre-wrap; }
    .muted { color: #9eb3c8; }
    .error { color: #ff8d8d; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state") ?? "";
  return html(
    `<h1>ล็อกอิน Google ผ่าน Firebase ของ DQueue</h1>
     <p>หน้านี้ใช้ Firebase project เดียวกับแอป DQueue เพื่อให้ได้ user เดียวกับแอปจริง</p>
     <p class="muted">State: <code>${state}</code></p>
     <button id="login">เปิด Google Login</button>
     <p id="status" class="muted">กดปุ่มเพื่อเริ่มล็อกอิน</p>
     <pre id="result"></pre>

     <script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js"></script>
     <script>
       const state = "${state}";
       const statusEl = document.getElementById("status");
       const resultEl = document.getElementById("result");
       const button = document.getElementById("login");

       const firebaseConfig = {
         apiKey: "AIzaSyBykAj72z0Z8xrF65xH3NPy6m7BSf70v14",
         authDomain: "panda-restaurant.firebaseapp.com",
         databaseURL: "https://panda-restaurant.firebaseio.com",
         projectId: "panda-restaurant",
         storageBucket: "panda-restaurant.appspot.com",
         messagingSenderId: "1026422127449",
         appId: "1:1026422127449:web:fb095830125494438c2a48"
       };

       firebase.initializeApp(firebaseConfig);
       const auth = firebase.auth();
       const provider = new firebase.auth.GoogleAuthProvider();
       provider.setCustomParameters({ prompt: "select_account" });

       async function saveUser(user) {
         statusEl.textContent = "กำลังแลก Firebase UID เป็น DQueue token...";
         const response = await fetch("/api/auth/google/firebase-complete", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
             state,
             uid: user.uid,
             email: user.email,
             displayName: user.displayName,
             photoURL: user.photoURL
           })
         });
         const data = await response.json();
         if (!response.ok || !data.ok) {
           statusEl.className = "error";
           statusEl.textContent = "ไม่สำเร็จ";
           resultEl.textContent = JSON.stringify(data, null, 2);
           return;
         }

         if (data.mode === "clone_login") {
           statusEl.className = "";
           statusEl.textContent = "ล็อกอินสำเร็จ! กำลังนำส่งสิทธิ์ไปยัง Local Agent...";
           try {
              const agentUrl = localStorage.getItem("dqueue_agent_url") || "http://127.0.0.1:5100";
              const cleanAgentUrl = agentUrl.endsWith("/") ? agentUrl.slice(0, -1) : agentUrl;
              const injectResponse = await fetch(cleanAgentUrl + "/api/accounts/inject-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  accountId: data.cloneAccountId,
                  jwtToken: data.token,
                  user: data.user
                })
              });
              if (!injectResponse.ok) {
                throw new Error("HTTP status " + injectResponse.status);
              }
              const injectData = await injectResponse.json();
              if (!injectData.ok) {
                throw new Error(injectData.error || "เอเจนต์ปฏิเสธการบันทึก");
              }
              statusEl.className = "";
              statusEl.textContent = "✓ นำส่งสิทธิ์เข้าใช้สำเร็จแล้ว! คุณสามารถเปิดแอปโคลนใน BlueStacks ใช้งานได้ทันที";
              resultEl.textContent = "Token: " + data.token.slice(0, 10) + "\\nUser: " + (data.user.displayName || data.user.email);
           } catch (err) {
             statusEl.className = "error";
             statusEl.textContent = "ส่งข้อมูลสิทธิ์เข้าใช้ไปยัง Local Agent ไม่สำเร็จ: " + err.message;
             resultEl.textContent = "กรุณาตรวจสอบว่าโปรแกรม Local Agent (Bot Manager) กำลังทำงานอยู่บนเครื่องของคุณ";
           }
           return;
         }

         statusEl.className = "";
         statusEl.textContent = data.tokenChanged ? "สำเร็จ token เปลี่ยนแล้ว" : "สำเร็จ แต่ backend คืน token ตัวเดิม";
         resultEl.textContent = JSON.stringify(data, null, 2);
       }

       // Check for redirect result on page load (in case popup was blocked/redirect occurred)
       auth.getRedirectResult()
         .then(async (result) => {
           if (result && result.user) {
             await saveUser(result.user);
           }
         })
         .catch((error) => {
           statusEl.className = "error";
           statusEl.textContent = "Google login (Redirect) ไม่สำเร็จ";
           resultEl.textContent = String(error && error.message ? error.message : error);
         });

       button.addEventListener("click", async () => {
         try {
           statusEl.className = "muted";
           statusEl.textContent = "กำลังเปิด Google popup...";
           const result = await auth.signInWithPopup(provider);
           await saveUser(result.user);
         } catch (error) {
           console.log("Popup failed, trying redirect fallback:", error);
           // If popup is blocked, closed, or not supported, redirect instead
           if (
             error.code === "auth/popup-blocked" ||
             error.code === "auth/popup-closed-by-user" ||
             error.code === "auth/operation-not-supported-in-this-environment"
           ) {
             statusEl.className = "muted";
             statusEl.textContent = "Popup ถูกบล็อก/ไม่รองรับ กำลังเปลี่ยนเส้นทาง (Redirect) ไปหน้า Google...";
             await auth.signInWithRedirect(provider);
           } else {
             statusEl.className = "error";
             statusEl.textContent = "Google login ไม่สำเร็จ";
             resultEl.textContent = String(error && error.message ? error.message : error);
           }
         }
       });
     </script>`
  );
}
