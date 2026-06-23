import fs from "fs";
import path from "path";

function run() {
  const wwwDir = "./dqueue_unpacked/assets/www";
  if (!fs.existsSync(wwwDir)) {
    console.log("❌ ไม่พบโฟลเดอร์ www (แตกไฟล์ยังไม่เสร็จหรือแอปไม่ได้เขียนด้วยเว็บ)");
    return;
  }

  console.log("🔎 กำลังสแกนหา API URL ในไฟล์ JavaScript ทั้งหมดของแอป...");
  const files = fs.readdirSync(wwwDir).filter(f => f.endsWith(".js"));
  
  const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_]+(:[0-9]+)?(\/[a-zA-Z0-9.\-_?&=]+)+/ig;
  const foundApis = new Set<string>();

  for (const file of files) {
    const content = fs.readFileSync(path.join(wwwDir, file), "utf8");
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
      foundApis.add(match[0]);
    }
  }

  const dqueueApis = Array.from(foundApis).filter(u => {
    const lower = u.toLowerCase();
    if (lower.includes("w3.org") || lower.includes("angular") || lower.includes("google") || lower.includes("ionic")) return false;
    return lower.includes("api") || lower.includes("delta") || lower.includes("dqueue") || lower.includes("book") || lower.includes("queue");
  });

  if (dqueueApis.length > 0) {
    console.log(`\n🎉 BINGO!! เจอ API ฝังอยู่ใน JavaScript ของแอปแล้ว จำนวน ${dqueueApis.length} รายการ:\n`);
    dqueueApis.forEach(u => console.log(`👉 ${u}`));
    fs.writeFileSync("./api_endpoints_js.txt", dqueueApis.join("\n"));
  } else {
    console.log("\n❌ หา API แบบตรงๆ ไม่เจอเลยครับ (อาจจะแยก Base URL กับ Path ออกจากกัน)");
  }
}

run();
