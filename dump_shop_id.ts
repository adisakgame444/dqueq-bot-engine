import { execSync } from "child_process";
import fs from "fs";

const ADB = `"C:\\Users\\User\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe" -s 127.0.0.1:5555`;
const PACKAGE_NAME = "me.deltaqueue.dqueue";
const DUMP_FILE = "/data/local/tmp/dqueue.hprof";

function run() {
    console.log("🚀 [ภารกิจล่า Shop ID] กำลังสูบข้อมูลจาก RAM เพื่อหา ID ร้าน...");
    try {
        console.log("🔍 กำลังค้นหาหมายเลข Process...");
        const pidOutput = execSync(`${ADB} shell pidof ${PACKAGE_NAME}`).toString().trim();
        const pid = pidOutput.split(" ")[0];
        
        console.log(`🧠 กำลังสูบข้อมูลจาก RAM (PID: ${pid})...`);
        execSync(`${ADB} shell am dumpheap ${pid} ${DUMP_FILE}`);
        
        console.log("⏳ รอระบบเขียนไฟล์...");
        execSync(`${ADB} shell sleep 5`);
        
        console.log("📥 กำลังดึงไฟล์ RAM มาวิเคราะห์...");
        execSync(`${ADB} pull ${DUMP_FILE} ./dqueue_dump.hprof`);
        
        let data = fs.readFileSync("dqueue_dump.hprof", "latin1");
        
        console.log("🧹 กำลังทำความสะอาดข้อมูล (ลบ Null Bytes เผื่อเป็น UTF-16)...");
        data = data.replace(/\x00/g, '');
        
        console.log("🔎 กำลังควานหาคำว่า Hotpot หรือ พรานนก แบบหว่านแห...");
        
        const searchTerms = ["hotpot", "ฮอทพอท", "พรานนก"];
        const dataLower = data.toLowerCase();
        let found = false;

        for (const term of searchTerms) {
            let index = dataLower.indexOf(term);
            while (index !== -1) {
                // ดึงข้อความรอบๆ 250 ตัวอักษร
                const start = Math.max(0, index - 250);
                const end = Math.min(data.length, index + 250);
                const snippet = data.substring(start, end);
                
                // ตรวจสอบว่าในข้อความรอบๆ มีคำว่า id หรือ res ไหม
                if (snippet.toLowerCase().includes("id") || snippet.toLowerCase().includes("res")) {
                    console.log(`\n🎉 เจอคำว่า '${term}'! ข้อมูลรอบๆ บริเวณนี้คือ:`);
                    console.log("--------------------------------------------------");
                    console.log(snippet);
                    console.log("--------------------------------------------------");
                    found = true;
                }
                
                // หาคำต่อไป
                index = dataLower.indexOf(term, index + 1);
            }
        }

        if (!found) {
            console.log("❌ ไม่เจอคำพวกนี้เลยครับ (แอปอาจจะบีบอัดข้อมูลหน้าจอไว้)");
        }
        
    } catch (e: any) {
        console.log("❌ เกิดข้อผิดพลาด:", e.message);
    }
}

run();
