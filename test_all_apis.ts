import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

const BASE_URL = 'backend4.deltaapiservice.com';

function apiRequest(path: string, method: string, payload: any = null): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: BASE_URL,
            port: 443,
            path: `/${path}`,
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'QueQ/10.0.0 (Android 9)',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ status: res.statusCode, data: data });
            });
        });

        req.on('error', (e) => resolve({ status: 500, error: e.message }));
        if (payload && method === 'POST') {
            req.write(JSON.stringify(payload));
        }
        req.end();
    });
}

async function runTests() {
    console.log("🚀 เริ่มต้นบททดสอบ 3 ฟังก์ชันหลักของบอทจองคิว...");
    
    // ==========================================
    // 1. ทดสอบ Refresh Token
    // ==========================================
    console.log("\n[1] 🔄 กำลังทดสอบ Refresh Token (/auth/refresh-token)...");
    const refreshRes = await apiRequest("auth/refresh-token", "POST", {});
    console.log(`Status: ${refreshRes.status}`);
    console.log(`Response: ${refreshRes.data.substring(0, 300)}`);
    
    // ==========================================
    // 2. ทดสอบจองคิว (Booking)
    // ==========================================
    console.log("\n[2] 🎟️ กำลังทดสอบจองคิว (/users-reservations/booking)...");
    // ลองใส่ข้อมูลมั่วๆ ไปก่อน เพื่อดูว่าเซิร์ฟเวอร์จะด่ากลับมาว่าขาดข้อมูลอะไรบ้าง
    const dummyBookingPayload = {
        id_res_auto: 99999, // รหัสร้านมั่ว
        zone_id: 0,
        people: 2,
        type_q_id: 1,
        type_q_name: "A"
    };
    const bookRes = await apiRequest("users-reservations/booking", "POST", dummyBookingPayload);
    console.log(`Status: ${bookRes.status}`);
    console.log(`Response: ${bookRes.data.substring(0, 300)}`);

    // ==========================================
    // 3. ทดสอบยกเลิกคิว (Cancel Queue)
    // ==========================================
    console.log("\n[3] ❌ กำลังทดสอบยกเลิกคิว (/users-reservations/cancel_queue)...");
    // ลองส่งรหัสคิวมั่วๆ เพื่อดูข้อความตีกลับ
    const dummyCancelPayload = {
        id_res_auto: 99999,
        zone_id: 0,
        queue_id: 123456
    };
    const cancelRes = await apiRequest("users-reservations/cancel_queue", "POST", dummyCancelPayload);
    console.log(`Status: ${cancelRes.status}`);
    console.log(`Response: ${cancelRes.data.substring(0, 300)}`);

    console.log("\n✅ จบการทดสอบ! ส่งผลลัพธ์มาให้ผมดูได้เลยครับลูกพี่!");
}

runTests();
