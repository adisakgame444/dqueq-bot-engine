const list = document.getElementById("accounts");
const notice = document.getElementById("notice");
const addButton = document.getElementById("add-account");
let busy = false;

function showNotice(message, error = false) {
  notice.textContent = message;
  notice.className = `notice visible${error ? " error" : ""}`;
}

function clearNotice() {
  notice.className = "notice";
  notice.textContent = "";
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

function badge(text, className = "") {
  return `<span class="badge ${className}">${text}</span>`;
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function copyText(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  fallbackCopy(text);
}

function render(accounts) {
  if (!accounts.length) {
    list.innerHTML = '<div class="empty">ยังไม่มีบัญชี</div>';
    return;
  }
  list.innerHTML = accounts
    .map((account) => {
      const sessionState = account.session?.state || "stopped";
      const statusBadges = [
        badge(
          account.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน",
          account.enabled ? "online" : "disabled"
        ),
        badge(account.installed ? "ติดตั้งแล้ว" : "ไม่พบแอป"),
        badge(`session: ${sessionState}`),
      ].join("");
      const enableButton = account.enabled
        ? `<button type="button" data-action="disable" data-id="${account.id}">ปิดใช้งาน</button>`
        : `<button type="button" data-action="enable" data-id="${account.id}">เปิดใช้งาน</button>`;
      const deleteButton = account.protected
        ? ""
        : `<button type="button" class="danger" data-action="delete" data-id="${account.id}">ลบถาวร</button>`;
      const openLink = account.enabled
        ? `<a href="${account.url}">เปิดหน้าจอ</a>`
        : "";
      const appLink = account.enabled
        ? `<a href="${account.appUrl}" target="_blank" rel="noopener">เปิดหน้าแอป (Android)</a>`
        : "";
      const appIosLink = account.enabled
        ? `<a href="${account.appIosUrl || ('/app-ios/' + account.id)}" target="_blank" rel="noopener">เปิดหน้าแอป (iOS)</a>`
        : "";
      const publicAppIosUrl =
        account.publicAppIosUrl ||
        `https://remote.bothero.online/app-ios/${account.id}?v=114`;
      const copyPublicLink = account.enabled
        ? `<button type="button" data-action="copy-public-link" data-id="${account.id}" data-url="${publicAppIosUrl}">คัดลอกลิงก์ส่งให้คนอื่น</button>`
        : "";
      return `
        <article class="card">
          <div class="account-top">
            <h2>${account.name}</h2>
            <div class="badges">${statusBadges}</div>
          </div>
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">หน้าจัดการ</span>
              <span class="detail-value">${location.origin}${account.url}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">หน้าแอป Android</span>
              <span class="detail-value">${location.origin}${account.appUrl}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">หน้าแอป iOS</span>
              <span class="detail-value">${location.origin}${account.appIosUrl || ('/app-ios/' + account.id)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">ลิงก์ส่งให้คนอื่น</span>
              <span class="detail-value public">${publicAppIosUrl}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Package</span>
              <span class="detail-value">${account.packageName}</span>
            </div>
          </div>
          <div class="actions">
            ${appLink}
            ${appIosLink}
            ${copyPublicLink}
            ${openLink}
            ${enableButton}
            ${deleteButton}
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadAccounts() {
  try {
    const data = await request("/api/accounts");
    busy = data.busy;
    addButton.disabled = busy;
    render(data.accounts);
  } catch (error) {
    showNotice(error.message, true);
  }
}

async function perform(action) {
  if (busy) return;
  busy = true;
  addButton.disabled = true;
  document
    .querySelectorAll("button[data-action]")
    .forEach((button) => (button.disabled = true));
  clearNotice();
  try {
    await action();
    await loadAccounts();
  } catch (error) {
    showNotice(error.message, true);
  } finally {
    busy = false;
    addButton.disabled = false;
  }
}

addButton.addEventListener("click", () => {
  perform(async () => {
    showNotice(
      "กำลังสร้าง เซ็น และติดตั้งแอปสำหรับบัญชีใหม่ ขั้นตอนนี้อาจใช้เวลาประมาณ 1-3 นาที กรุณาอย่าปิดเซิร์ฟเวอร์"
    );
    const data = await request("/api/accounts", {
      method: "POST",
      body: "{}",
    });
    showNotice(`${data.account.name} พร้อมใช้งานแล้ว`);
  });
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "enable" || action === "disable") {
    perform(async () => {
      const enabled = action === "enable";
      await request(`/api/accounts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled }),
      });
      showNotice(
        enabled
          ? `เปิดใช้งาน Account ${id} แล้ว`
          : `ปิด Account ${id} แล้ว ข้อมูลล็อกอินยังอยู่`
      );
    });
    return;
  }

  if (action === "copy-public-link") {
    copyText(button.dataset.url)
      .then(() => {
        showNotice(`คัดลอกลิงก์ Account ${id} แล้ว: ${button.dataset.url}`);
      })
      .catch((error) => {
        showNotice(error.message || "คัดลอกลิงก์ไม่สำเร็จ", true);
      });
    return;
  }

  if (action === "delete") {
    const required = `DELETE ACCOUNT ${id}`;
    const confirmation = window.prompt(
      `การลบถาวรจะถอนแอปและลบข้อมูลล็อกอินของ Account ${id}\nพิมพ์ ${required} เพื่อยืนยัน`
    );
    if (confirmation !== required) {
      showNotice("ยกเลิกการลบ เพราะข้อความยืนยันไม่ตรง");
      return;
    }
    perform(async () => {
      await request(`/api/accounts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ confirm: confirmation }),
      });
      showNotice(`ลบ Account ${id} ออกจาก Android แล้ว`);
    });
  }
});

loadAccounts();
window.setInterval(() => {
  if (!busy) loadAccounts();
}, 5000);
