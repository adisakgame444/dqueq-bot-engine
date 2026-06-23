import { execSync } from "child_process";
import fs from "fs";

function extractAsciiStrings(buffer: Buffer, minLength: number = 8): string[] {
  const strings: string[] = [];
  let currentString = "";

  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    if (byte >= 32 && byte <= 126) {
      currentString += String.fromCharCode(byte);
    } else {
      if (currentString.length >= minLength) {
        strings.push(currentString);
      }
      currentString = "";
    }
  }
  if (currentString.length >= minLength) strings.push(currentString);
  return strings;
}

function run() {
  const pkg = "me.deltaqueue.dqueue";
  const adb = "adb -s 127.0.0.1:5555";
  const apkPath = "./dqueue_base.apk";

  console.log(`🚀 [APK API Extractor] เริ่มต้นเจาะโค้ดแอป ${pkg} แบบ Static Analysis...`);

  try {
    // 1. หาตำแหน่ง APK ในเครื่อง
    console.log("🔎 กำลังค้นหาที่อยู่ไฟล์แอปใน Emulator...");
    const pathResult = execSync(`${adb} shell pm path ${pkg}`).toString().trim();
    if (!pathResult) {
      console.log("❌ ไม่พบแอป DQueue ในเครื่องครับ");
      return;
    }
    
    // แอปสมัยใหม่จะแยกไฟล์ (Split APK) ทำให้ได้ผลลัพธ์มาหลายบรรทัด
    // เราจะดึงเฉพาะบรรทัดแรก (base.apk) ที่เป็นโครงสร้างหลัก
    const baseApkLine = pathResult.split("\n")[0];
    const realPath = baseApkLine.replace("package:", "").trim();
    console.log(`✅ เจอไฟล์แอปที่: ${realPath}`);

    // 2. ดึงไฟล์ APK กลับมา
    console.log("📥 กำลังดึงไฟล์แอปพลิเคชัน (APK) กลับมาที่คอมพิวเตอร์ (รอประมาณ 10-20 วินาที)...");
    execSync(`${adb} pull "${realPath}" ${apkPath}`);
    console.log("✅ ดึงไฟล์ APK สำเร็จ!");

    // 3. สแกนหา URL ในระดับ Raw Byte จากไฟล์ APK เลย (เพราะมันมี Source Code และ Hardcoded Strings อยู่)
    console.log("🔎 กำลังสแกนหา API (Hardcoded URL) จาก Source Code ของแอป...");
    const buffer = fs.readFileSync(apkPath);
    
    const allStrings = extractAsciiStrings(buffer, 10);
    
    // Regex จับพวก API, URL
    const urlRegex = /https?:\/\/[a-zA-Z0-9.\-_]+(:[0-9]+)?(\/[a-zA-Z0-9.\-_?&=]+)+/i;
    const pathRegex = /\/(api|v1|v2|book|booking|queue|reserve)\/[a-zA-Z0-9.\-_?&=/]+/i;

    const foundApis = new Set<string>();

    for (const str of allStrings) {
      if (urlRegex.test(str)) foundApis.add(str);
      else if (str.startsWith("/") && pathRegex.test(str)) foundApis.add(str);
    }

    // กรองเอาเฉพาะที่น่าจะเป็นของระบบแอปนี้จริงๆ
    const dqueueApis = Array.from(foundApis).filter(u => {
      const lower = u.toLowerCase();
      // ตัดพวกลิงก์ระบบของ Google, Android, Facebook ออกให้หมด
      if (lower.includes("google") || lower.includes("facebook") || lower.includes("android") || lower.includes("firebase") || lower.includes("crashlytics")) return false;
      
      return lower.includes('dqueue') || 
             lower.includes('delta') || 
             lower.includes('api') || 
             lower.includes('book') ||
             lower.includes('queue');
    });

    if (dqueueApis.length > 0) {
      console.log(`\n🎉 BINGO!! เจอ API ที่ฝังอยู่ในโค้ดแอป (Hardcoded) ทั้งหมด ${dqueueApis.length} รายการ:\n`);
      dqueueApis.forEach(u => console.log(`👉 ${u}`));
      
      fs.writeFileSync("./api_endpoints_from_apk.txt", dqueueApis.join("\n"));
      console.log("\n✅ บันทึกลงไฟล์ api_endpoints_from_apk.txt เรียบร้อยครับ!");
      console.log("👉 ตอนนี้เราได้โครงสร้าง API พื้นฐานมาแล้ว เอาไปเขียนระบบต่อได้เลย!");
    } else {
      console.log("\n❌ ไม่พบ URL ที่ชัดเจน (แอปอาจจะใช้วิธีต่อ String แบบซับซ้อน หรือซ่อนไว้ด้วยเทคนิค Obfuscation)");
    }

    // ลบไฟล์ทิ้งเพื่อประหยัดพื้นที่
    fs.unlinkSync(apkPath);

  } catch (e: any) {
    console.error("\n❌ เกิดข้อผิดพลาด:", e.message);
  }
}

run();
