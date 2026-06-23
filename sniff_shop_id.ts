import { spawn } from "child_process";

const ADB = `"C:\\Users\\User\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe"`;

function run() {
    console.log("🚀 [System Diagnostic] เริ่มต้นดักจับ Log ระดับ System (Logcat)...");
    console.log("💡 คำแนะนำ: กรุณากดเข้าไปที่หน้าร้าน 'Hotpot Man' ในแอปจำลองตอนนี้เลยครับ");
    console.log("⏳ กำลังรอสัญญาณข้อมูล... (กด Ctrl+C เพื่อหยุดเมื่อเจอข้อมูล)");

    // ล้าง log เก่าทิ้งก่อน
    spawn(ADB, ["-s", "127.0.0.1:5555", "logcat", "-c"], { shell: true });

    // เริ่มดักจับ log ใหม่
    const logcat = spawn(ADB, ["-s", "127.0.0.1:5555", "logcat"], { shell: true });

    logcat.stdout.on("data", (data) => {
        const text = data.toString().toLowerCase();
        
        // ดักจับ Keyword ที่เกี่ยวข้องกับการโหลดข้อมูลร้าน
        if (text.includes("hotpot") || text.includes("id_res") || text.includes("shop_id")) {
            console.log("\n--------------------------------------------------");
            console.log("🔔 [DETECTED] พบการเคลื่อนไหวที่ตรงกับ Keyword!");
            console.log(data.toString().trim());
            console.log("--------------------------------------------------");
        }
    });

    logcat.stderr.on("data", (data) => {
        // เงียบไว้ถ้ามี error จาก adb
    });
}

run();
