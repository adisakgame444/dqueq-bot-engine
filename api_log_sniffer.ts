import { execSync } from "child_process";
import fs from "fs";

function run() {
  const adb = "adb -s 127.0.0.1:5555";
  
  console.log(`🚀 [API Log Sniffer] เปลี่ยนแผน! สแกนหา API จาก Android System Logs (Logcat)...`);
  
  try {
    // 1. ล้าง Log เก่าทิ้ง
    console.log("🧹 กำลังล้าง Log เก่า...");
    execSync(`cmd /c "${adb} logcat -c"`);
    
    console.log("⏳ กรุณากดจองคิวในแอป DQueue ตอนนี้เลยครับ! (มีเวลา 15 วินาที)...");
    
    // 2. รอ 15 วินาที
    const waitTime = 15;
    for (let i = waitTime; i > 0; i--) {
      process.stdout.write(`\r⏳ เหลือเวลา ${i} วินาที... `);
      execSync("ping 127.0.0.1 -n 2 > nul"); // รอ 1 วินาที
    }
    console.log("\n📥 หมดเวลา! กำลังดึงข้อมูล Logcat...");

    // 3. ดึง Logcat
    const logs = execSync(`cmd /c "${adb} logcat -d"`).toString();
    
    // 4. ค้นหา
    const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_]+(:[0-9]+)?(\/[a-zA-Z0-9.\-_?&=]+)+/ig;
    const apiPathRegex = /\/(api|v1|v2|book|queue|reserve|shops?)\/[a-zA-Z0-9.\-_?&=/]+/ig;

    const foundApis = new Set<string>();

    let match;
    while ((match = urlRegex.exec(logs)) !== null) foundApis.add(match[0]);
    while ((match = apiPathRegex.exec(logs)) !== null) foundApis.add(match[0]);

    // สแกนหาอีเมลเผื่อหลุดมาใน Log
    if (logs.includes("legiaha86916") || logs.includes("duongducthu894")) {
        console.log("⚠️ เจออีเมลหลุดอยู่ใน Log ด้วย!");
        fs.writeFileSync("./logcat_email_leak.txt", logs);
    }

    const dqueueApis = Array.from(foundApis).filter(u => {
      const lower = u.toLowerCase();
      return lower.includes('dqueue') || 
             lower.includes('delta') || 
             lower.includes('api') || 
             lower.includes('book') ||
             lower.includes('queue');
    });

    if (dqueueApis.length > 0) {
      console.log(`\n🎉 BINGO!! จับ API ได้จาก Logcat ทั้งหมด ${dqueueApis.length} รายการ:\n`);
      dqueueApis.forEach(u => console.log(`👉 ${u}`));
      fs.writeFileSync("./api_endpoints_from_logcat.txt", dqueueApis.join("\n"));
      console.log("\n✅ บันทึกลงไฟล์ api_endpoints_from_logcat.txt เรียบร้อย!");
    } else {
      console.log("\n❌ ไม่พบ API ใน Logcat เลยครับ (แอปปิดระบบ Logging ไว้)");
    }

  } catch (e: any) {
    console.error("\n❌ เกิดข้อผิดพลาด:", e.message);
  }
}

run();
