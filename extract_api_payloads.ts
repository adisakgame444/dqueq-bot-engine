import fs from "fs";

function run() {
  const file = "./dqueue_unpacked/assets/www/main.32d8d48cd85e9cb6.js";
  if (!fs.existsSync(file)) {
    console.log("❌ ไม่พบไฟล์ main.js");
    return;
  }

  console.log("🔎 กำลังสกัดโครงสร้าง JSON และ Source Code รอบๆ ฟังก์ชันจองคิว...");
  const content = fs.readFileSync(file, "utf8");
  
  // คำค้นหาเป้าหมาย
  const keywords = [
    "send_event", 
    "backend4.deltaapiservice.com", 
    "bookQueue",
    "myApiService"
  ];

  let output = "";

  for (const kw of keywords) {
    let idx = content.indexOf(kw);
    let count = 0;
    while (idx !== -1 && count < 3) { // เอาแค่ 3 จุดแรกที่เจอต่อ 1 keyword
      // ดึงข้อความแวดล้อม (ก่อนหน้า 300 ตัวอักษร, ข้างหลัง 1000 ตัวอักษร)
      const start = Math.max(0, idx - 300);
      const end = Math.min(content.length, idx + 1000);
      let slice = content.substring(start, end);

      // จัดฟอร์แมตให้อ่านง่ายขึ้น (Un-minify แบบหยาบๆ)
      slice = slice.replace(/\{/g, "{\n  ");
      slice = slice.replace(/\}/g, "\n}\n");
      slice = slice.replace(/;/g, ";\n");
      slice = slice.replace(/,/g, ",\n  ");

      output += `\n\n======================================================\n`;
      output += `🔥 จุดที่พบคำว่า: '${kw}' (ตำแหน่งที่ ${idx})\n`;
      output += `======================================================\n\n`;
      output += slice;

      idx = content.indexOf(kw, idx + 1);
      count++;
    }
  }

  fs.writeFileSync("./api_payload_context.js", output);
  console.log("✅ สกัดโค้ดแวดล้อมและจัดฟอร์แมตเบื้องต้น บันทึกลงไฟล์ api_payload_context.js สำเร็จ!");
  console.log("👉 เชิญเปิดไฟล์ api_payload_context.js เพื่อดูโครงสร้าง JSON ตอนยิง API ได้เลยครับ!");
}

run();
