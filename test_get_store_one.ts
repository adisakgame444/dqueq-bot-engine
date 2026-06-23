import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

function apiRequest(path: string): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: 'backend4.deltaapiservice.com',
            port: 443,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'QueQ/10.0.0 (Android 9)'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });
        req.on('error', (e) => resolve({ status: 500, error: e.message }));
        req.end();
    });
}

async function run() {
    console.log("🚀 [ไม้ตายสุดท้าย] กำลังยิงสุ่มรหัสร้านทีละเบอร์เพื่อหา Hotpot Man...");
    
    // ลองสุ่มรหัสร้านสัก 5 เบอร์ เพื่อดูว่า API ดึงข้อมูลร้านชื่ออะไร (เช่น เบอร์ 1, 2, 100, 500, 2690)
    const testIds = [1, 2, 100, 500, 2690, 3000];
    
    // ลอง 2 รูปแบบ URL
    const prefixes = ["/get_store_one/", "/dqueue/get_store_one/"];
    
    let workingPrefix = null;
    
    console.log("🔍 กำลังทดสอบหา URL ที่ถูกต้อง...");
    for (const prefix of prefixes) {
        const res = await apiRequest(`${prefix}1`);
        if (res.status === 200 && res.data) {
            console.log(`✅ โป๊ะเชะ! URL ที่ถูกต้องคือ: ${prefix}`);
            workingPrefix = prefix;
            break;
        }
    }
    
    if (!workingPrefix) {
        console.log("❌ ขนาดสุ่มดึงข้อมูลร้านทีละเบอร์ยังโดนบล็อค 404 หมดเลยครับ (ระบบมันอาจจะเปลี่ยน URL ใหม่)");
        console.log("\n💡 ลูกพี่ครับ วิธีเดียวที่เหลืออยู่คือลูกพี่ต้องสลับหน้าจอไปดูในโปรเจกต์ `queue-bot-engine` โฟลเดอร์ `scratch` แล้วหาก๊อปปี้ ID จากไฟล์ `check_hotpot_lines.ts` หรือ `search_bonus_suki.ts` มาให้ผมแล้วล่ะครับ!");
        return;
    }
    
    console.log(`\n🔎 กำลังดึงข้อมูลร้านตัวอย่างด้วย URL: ${workingPrefix}...`);
    for (const id of testIds) {
        const res = await apiRequest(`${workingPrefix}${id}`);
        if (res.status === 200 && res.data) {
            const name = res.data.shop_name_th || res.data.name || "ไม่ทราบชื่อ";
            console.log(`- Shop ID: ${id} คือร้าน "${name}"`);
        } else {
            console.log(`- Shop ID: ${id} ไม่มีข้อมูลในระบบ`);
        }
    }
    
    console.log("\n⚠️ ถ้าเราเห็นชื่อร้านโผล่มา แปลว่าเราสามารถเขียนสคริปต์สแกนรหัสตั้งแต่ 1 ถึง 5000 เพื่อไล่หา Hotpot Man ได้เลยครับ!");
}

run();
