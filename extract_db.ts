import { execSync } from "child_process";
import fs from "fs";

const ADB = `"C:\\Users\\User\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe" -s 127.0.0.1:5555`;

function run() {
    console.log("🚀 กำลังเจาะเข้าฐานข้อมูล (Database) ภายในเครื่องมือถือเพื่อควานหารหัสร้าน...");
    
    try {
        // สร้างโฟลเดอร์สำหรับเก็บฐานข้อมูลชั่วคราวในมือถือ
        execSync(`${ADB} shell "su -c 'mkdir -p /sdcard/queq_db'"`);
        
        // ก๊อปปี้ฐานข้อมูลของแอปออกมา
        execSync(`${ADB} shell "su -c 'cp -r /data/data/me.deltaqueue.dqueue/databases/* /sdcard/queq_db/'"`);
        
        // ดึงไฟล์ลงคอม
        console.log("📥 กำลังดึงไฟล์ฐานข้อมูลลงมาวิเคราะห์...");
        execSync(`${ADB} pull /sdcard/queq_db ./queq_db`);
        
        // ทำความสะอาดมือถือ
        execSync(`${ADB} shell "su -c 'rm -rf /sdcard/queq_db'"`);
        
        // ค้นหาคำว่า hotpot ในไฟล์ทั้งหมดที่ดึงมา
        const files = fs.readdirSync("./queq_db");
        let found = false;
        
        for (const file of files) {
            const filePath = `./queq_db/${file}`;
            if (fs.statSync(filePath).isFile()) {
                let data = fs.readFileSync(filePath, "latin1");
                data = data.replace(/\x00/g, ''); // ลบ Null bytes
                
                const regex = /{[^{}]*id_res_auto[^{}]*}/gi;
                let match;
                
                // ค้นหาแบบกว้างๆ ก่อน
                if (data.toLowerCase().includes("hotpot") || data.includes("พรานนก")) {
                    console.log(`\n🎉 เจอคำว่า Hotpot แฝงตัวอยู่ในฐานข้อมูลไฟล์: ${file}`);
                    
                    // หาตัวเลขใกล้ๆ
                    const index = data.toLowerCase().indexOf("hotpot");
                    const snippet = data.substring(Math.max(0, index - 200), Math.min(data.length, index + 200));
                    console.log("ข้อมูลที่พบ:");
                    console.log("-----------------------");
                    console.log(snippet);
                    console.log("-----------------------");
                    found = true;
                }
            }
        }
        
        if (!found) {
            console.log("❌ ค้นหาในฐานข้อมูลมือถือแล้วยังไม่เจอครับ (อาจจะเก็บไว้ที่อื่น)");
        }
        
    } catch (e: any) {
        console.log("❌ เกิดข้อผิดพลาดในการดึงฐานข้อมูล (เครื่องอาจจะไม่รองรับคำสั่ง Root):", e.message);
    }
}

run();
