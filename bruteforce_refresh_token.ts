import fs from "fs";
import https from "https";

const BASE_URL = 'backend4.deltaapiservice.com';

function apiRequest(accessToken: string, payload: any): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: BASE_URL,
            port: 443,
            path: '/auth/refresh-token',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'QueQ/10.0.0 (Android 9)',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        req.write(JSON.stringify(payload));
        req.end();
    });
}

async function run() {
    console.log("🚀 [Advanced Mode] เริ่มต้นกระบวนการ Bruteforce หา Refresh Token...");
    
    // 1. โหลด Access Token หลัก
    const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
    const accessToken = tokenFile.split('\n')[0];

    // 2. ดึง JWT ทั้งหมดออกจาก RAM (ไม่สนโครงสร้างตัวแปร)
    console.log("🧠 กำลังกวาด JWT ทั้งหมดใน RAM...");
    let ramData = fs.readFileSync("dqueue_dump.hprof", "latin1").replace(/\x00/g, '');
    
    const jwtRegex = /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g;
    const allTokens = new Set<string>();
    let match;
    
    while ((match = jwtRegex.exec(ramData)) !== null) {
        // คัดกรอง Token ที่สั้นเกินไปทิ้ง
        if (match[0].length > 100) {
            allTokens.add(match[0]);
        }
    }
    
    const tokensList = Array.from(allTokens);
    console.log(`🔎 คัดกรอง Token ที่น่าสงสัยได้ทั้งหมด ${tokensList.length} รูปแบบ`);

    if (tokensList.length === 0) {
        console.log("❌ ไม่พบโครงสร้าง Token ในระบบ");
        return;
    }

    // 3. นำ Token ทั้งหมดไปสุ่มยิงเพื่อหาอันที่เป็น Refresh Token ของจริง
    console.log("⏳ กำลังเริ่มทดสอบยิง API ทีละตัว...");
    let found = false;
    
    for (let i = 0; i < tokensList.length; i++) {
        const candidate = tokensList[i];
        
        // ทดสอบทั้ง 2 คีย์หลัก
        const payloads = [
            { refreshToken: candidate },
            { refresh_token: candidate }
        ];

        for (const payload of payloads) {
            const res = await apiRequest(accessToken, payload);
            if (res.status === 200 || res.status === 201) {
                console.log("\n🎉🎉🎉 แจ็คพอตแตก!! เจอ Refresh Token ของจริงแล้วครับ! 🎉🎉🎉");
                console.log(`🔑 Refresh Token: ${candidate.substring(0, 50)}...`);
                console.log("-----------------------------------------");
                console.log("📦 ข้อมูลที่เซิร์ฟเวอร์ส่งกลับมาให้ (Access Token ใหม่):");
                console.log(res.data);
                console.log("-----------------------------------------");
                
                // บันทึก Refresh Token ลงไฟล์
                fs.writeFileSync("extracted_refresh_tokens.txt", candidate);
                console.log("✅ บันทึก Refresh Token ลงไฟล์ 'extracted_refresh_tokens.txt' สำเร็จ!");
                
                found = true;
                break;
            }
        }
        if (found) break;
    }

    if (!found) {
        console.log("\n❌ ยิงทดสอบครบทุก Token ใน RAM แล้ว ไม่มีตัวไหนเป็น Refresh Token เลยครับ (แปลว่าแอปไม่ได้ใช้รูปแบบ JWT ปกติ หรืออาจจะเก็บไว้ที่อื่น)");
    }
}

run();
