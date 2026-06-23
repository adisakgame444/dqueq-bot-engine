import fs from "fs";
import https from "https";

async function testApi() {
    console.log("🚀 กำลังทดสอบ Token ทองคำ กับระบบของ DQueue...");
    
    // 1. อ่าน Token ที่ดูดมาจาก RAM
    const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
    const token = tokenFile.split('\n')[0]; // เอาบรรทัดแรก
    
    if (!token) {
        console.error("❌ ไม่พบ Token ในไฟล์");
        return;
    }

    // 2. ตั้งค่า API Request (จำลองตัวเป็นมือถือ)
    const options = {
        hostname: 'backend4.deltaapiservice.com',
        port: 443,
        path: '/dqueue/users-reservations/myqueue', // เปลี่ยนมาทดสอบ endpoint ข้อมูลคิว
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'QueQ/10.0.0 (Android 9)',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    console.log("📡 กำลังยิง API ทะลวงกำแพง...");
    
    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log(`✅ สถานะการเชื่อมต่อ: ${res.statusCode} (ถ้า 200 คือผ่านฉลุย!)`);
            console.log(`📦 ข้อมูลที่ส่งกลับมา: ${data.substring(0, 500)}`);
            try {
                const json = JSON.parse(data);
                console.log("จำนวนร้านที่เจอ: " + (json.data ? json.data.length : 'ไม่ทราบ'));
                
                // พิมพ์ตัวอย่างชื่อร้านแรกที่เจอ
                if (json.data && json.data.length > 0) {
                    console.log(`👉 ตัวอย่างร้าน: ${json.data[0].shop_name_th || json.data[0].name}`);
                }
            } catch(e) {
                console.log("❌ ข้อมูลที่ได้ไม่ใช่ JSON ที่สมบูรณ์");
            }
        });
    });

    req.on('error', (e) => {
        console.error("❌ พังครับ:", e.message);
    });

    req.end();
}

testApi();
