import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

function apiRequest(path: string, method: string, payload: any = null): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: 'backend4.deltaapiservice.com',
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

async function run() {
    console.log("🚀 [Reverse Extraction] เริ่มกระบวนการสกัด Shop ID จากคิวที่จองไว้...");
    
    // 1. ดึงข้อมูลคิวปัจจุบัน
    console.log("📥 กำลังเรียก API ตรวจสอบคิวปัจจุบัน (myqueue)...");
    const queueRes = await apiRequest("users-reservations/myqueue", "GET");
    
    if (queueRes.status === 200 && queueRes.data && queueRes.data.reservMyqueue && queueRes.data.reservMyqueue.length > 0) {
        const myQueue = queueRes.data.reservMyqueue[0];
        const shopId = myQueue.id_res_auto;
        const zoneId = myQueue.zone_id;
        const queueId = myQueue.queue_id || myQueue.id;
        const shopName = myQueue.shop_name_th || "ไม่ทราบชื่อ";
        
        console.log("\n🎉🎉🎉 สำเร็จ! ดึงข้อมูล Shop ID ออกมาได้แล้วครับ! 🎉🎉🎉");
        console.log("-----------------------------------------");
        console.log(`🏪 ชื่อร้าน: ${shopName}`);
        console.log(`🔑 Shop ID: ${shopId}`);
        console.log(`📍 Zone ID: ${zoneId}`);
        console.log(`🎫 หมายเลขคิวของคุณ: ${myQueue.q_number || myQueue.queue_no || myQueue.que_no}`);
        console.log("-----------------------------------------");
        console.log("📦 ข้อมูลดิบจากเซิร์ฟเวอร์ (Raw JSON):");
        console.log(JSON.stringify(myQueue, null, 2));
        console.log("-----------------------------------------");
        console.log("🔥 เราได้ Shop ID มาใช้สำหรับเขียนบอทจองคิวแล้วครับ!");

        // 2. ยกเลิกคิวเพื่อไม่ให้รบกวนร้าน
        const actualQueueId = myQueue.queue_id || myQueue.id || myQueue.id_res_auto;
        console.log(`\n❌ กำลังส่ง API ยกเลิกคิว (Queue ID: ${actualQueueId}) อัตโนมัติเพื่อลบข้อมูล...`);
        const cancelPayload = {
            id_res_auto: shopId,
            zone_id: zoneId,
            queue_id: actualQueueId
        };
        const cancelRes = await apiRequest("users-reservations/cancel_queue", "POST", cancelPayload);
        
        if (cancelRes.status === 200 || cancelRes.status === 201) {
            console.log("✅ ยกเลิกคิวสำเร็จ ระบบสะอาดเรียบร้อยครับ!");
        } else {
            console.log(`⚠️ ยกเลิกคิวไม่สำเร็จ (Status: ${cancelRes.status}) อาจต้องกดยกเลิกในแอปเองครับ`);
        }
    } else {
        console.log("\n❌ ไม่พบข้อมูลคิวในระบบครับ");
        console.log("💡 คำแนะนำ: คุณต้อง 'กดจองคิว' ในแอปจำลองให้สำเร็จก่อน (ให้ได้หมายเลขคิว) แล้วค่อยรันสคริปต์นี้เพื่อสกัด ID ออกมาครับ");
    }
}

run();
