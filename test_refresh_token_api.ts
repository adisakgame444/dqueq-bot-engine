import fs from "fs";
import https from "https";

// โหลด Access Token
const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const accessToken = tokenFile.split('\n')[0];

// โหลด Refresh Token
let refreshToken = "";
try {
    const rtFile = fs.readFileSync("extracted_refresh_tokens.txt", "utf8").trim();
    refreshToken = rtFile.split('\n')[0];
} catch {
    console.log("❌ ไม่พบไฟล์ extracted_refresh_tokens.txt กรุณารัน scan_refresh_token.ts ก่อนครับ");
    process.exit(1);
}

const BASE_URL = 'backend4.deltaapiservice.com';

function apiRequest(path: string, payload: any = null): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: BASE_URL,
            port: 443,
            path: `/${path}`,
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
        if (payload) req.write(JSON.stringify(payload));
        req.end();
    });
}

async function testRefreshToken() {
    console.log("🚀 กำลังทดสอบระบบต่ออายุ Token (Refresh Token)...");
    
    // ลองรูปแบบ Payload ที่แอปทั่วไปนิยมใช้
    const payloadsToTest = [
        { refreshToken: refreshToken },
        { refresh_token: refreshToken },
        { token: refreshToken }
    ];
    
    for (const [index, payload] of payloadsToTest.entries()) {
        console.log(`\n⏳ [รูปแบบที่ ${index + 1}] ทดสอบส่ง Payload: ${Object.keys(payload)[0]}`);
        const res = await apiRequest("auth/refresh-token", payload);
        
        console.log(`Status: ${res.status}`);
        if (res.status === 200 || res.status === 201) {
            console.log("✅ สำเร็จ!! โครงสร้างที่ถูกต้องคือรูปแบบนี้ครับ!");
            console.log("ได้ Access Token ใหม่มาแล้ว:", String(res.data.accessToken || res.data.token).substring(0, 50) + "...");
            return;
        } else {
            console.log("❌ ไม่ผ่าน", res.data);
        }
    }
    
    console.log("\n⚠️ ทดสอบครบทุกรูปแบบพื้นฐานแล้วยังไม่ผ่าน อาจจะต้องใช้การตั้งค่า Header แบบพิเศษครับ");
}

testRefreshToken();
