import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
let token = tokenFile.split('\n')[0];
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
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });
        req.on('error', (e) => resolve({ status: 500, error: e.message }));
        if (payload && method === 'POST') req.write(JSON.stringify(payload));
        req.end();
    });
}

async function forceCancel() {
    console.log("🧹 กำลังตรวจสอบและเคลียร์คิวที่ค้างอยู่ในระบบ...");
    const res = await apiRequest("users-reservations/myqueue", "GET");
    
    if (res.status === 200 && res.data && res.data.reservMyqueue && res.data.reservMyqueue.length > 0) {
        const myQueue = res.data.reservMyqueue[0];
        console.log("📦 ข้อมูลคิวที่ค้างอยู่:");
        console.log(JSON.stringify(myQueue, null, 2));
        
        // ลองหาคีย์ที่เป็น Queue ID จริงๆ (อาจจะเป็น _id, id หรือ queue_id)
        const qId = myQueue._id || myQueue.queue_id || myQueue.id;
        
        if (qId) {
            console.log(`\n❌ กำลังบังคับยกเลิกคิวรหัส: ${qId}`);
            const cancelPayload = {
                id_res_auto: myQueue.id_res_auto,
                zone_id: myQueue.zone_id,
                queue_id: qId
            };
            const cancelRes = await apiRequest("users-reservations/cancel_queue", "POST", cancelPayload);
            console.log(`Status: ${cancelRes.status}`);
            console.log("Response:", cancelRes.data);
        }
    } else {
        console.log("✅ ไม่มีคิวค้างในระบบแล้วครับ");
    }
}

forceCancel();
