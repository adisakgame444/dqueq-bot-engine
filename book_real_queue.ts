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
    console.log("🔥 เริ่มภารกิจจองคิวของจริง (End-to-End)...");

    // 1. ค้นหาร้านอาหาร (ดึงร้านทั้งหมด)
    console.log("\n[1] 🔎 กำลังค้นหาร้านอาหารใกล้เคียง...");
    const searchRes = await apiRequest("zone/get_store_all", "GET");
    
    let shopId = null;
    let zoneId = 0;
    let shopName = "";

    if (searchRes.status === 200 && searchRes.data && searchRes.data.length > 0) {
        // บางที API คืนค่าเป็น Array ตรงๆ
        const shop = searchRes.data[0];
        shopId = shop.id_res_auto || shop.id;
        shopName = shop.shop_name_th || shop.name || "ไม่ทราบชื่อ";
        zoneId = shop.zone_id || 0;
        console.log(`✅ เลือกร้านเป้าหมาย: ${shopName} (ID: ${shopId}, Zone: ${zoneId})`);
    } else if (searchRes.status === 200 && searchRes.data.data && searchRes.data.data.length > 0) {
        const shop = searchRes.data.data[0];
        shopId = shop.id_res_auto || shop.id;
        shopName = shop.shop_name_th || shop.name || "ไม่ทราบชื่อ";
        zoneId = shop.zone_id || 0;
        console.log(`✅ เลือกร้านเป้าหมาย: ${shopName} (ID: ${shopId}, Zone: ${zoneId})`);
    } else {
        console.log(`❌ ไม่พบร้านอาหารผ่าน API (Status: ${searchRes.status})`);
        console.log("Response:", JSON.stringify(searchRes.data).substring(0, 300));
        return; // หยุดทำงานถ้าหาร้านไม่เจอ
    }

    if (!shopId) return;

    // 2. กดจองคิว
    console.log(`\n[2] 🎟️ กำลังส่งคำสั่งจองคิวร้าน ${shopName}...`);
    const bookingPayload = {
        id_res_auto: shopId,
        zone_id: zoneId,
        people: 1,
        type_q_id: 1,
        type_q_name: "Walk in"
    };
    const bookRes = await apiRequest("users-reservations/booking", "POST", bookingPayload);
    
    if (bookRes.status === 201 || bookRes.status === 200) {
        console.log("✅ จองคิวสำเร็จ!");
        console.log("ข้อมูลที่ได้:", bookRes.data);
    } else {
        console.log(`❌ จองคิวไม่ผ่าน (Status: ${bookRes.status})`);
        console.log("เหตุผล:", bookRes.data);
        return;
    }

    // 3. ตรวจสอบคิวของฉัน
    console.log("\n[3] 📋 กำลังเช็คสถานะคิวล่าสุด...");
    const queueRes = await apiRequest("users-reservations/myqueue", "GET");
    let queueIdToCancel = null;
    
    if (queueRes.status === 200 && queueRes.data.reservMyqueue && queueRes.data.reservMyqueue.length > 0) {
        const myQueue = queueRes.data.reservMyqueue[0];
        queueIdToCancel = myQueue.queue_id || myQueue.id;
        console.log(`✅ พบข้อมูลคิว! คิวของคุณคือ: ${myQueue.q_number || 'ไม่ทราบเบอร์คิว'}`);
    } else {
        console.log("❌ ไม่พบข้อมูลคิวในระบบหลังจากจอง");
    }

    // 4. ยกเลิกคิว (ไม่ให้กวนร้าน)
    if (queueIdToCancel) {
        console.log(`\n[4] ❌ กำลังยกเลิกคิว (Queue ID: ${queueIdToCancel}) เพื่อไม่ให้รบกวนทางร้าน...`);
        const cancelPayload = {
            id_res_auto: shopId,
            zone_id: zoneId,
            queue_id: queueIdToCancel
        };
        const cancelRes = await apiRequest("users-reservations/cancel_queue", "POST", cancelPayload);
        
        if (cancelRes.status === 200 || cancelRes.status === 201) {
            console.log("✅ ยกเลิกคิวสำเร็จเรียบร้อยครับ!");
        } else {
            console.log(`❌ ยกเลิกคิวไม่สำเร็จ (Status: ${cancelRes.status})`);
            console.log("เหตุผล:", cancelRes.data);
        }
    }

    console.log("\n🎉 ภารกิจจองคิว + ยกเลิกคิวแบบ Full Loop เสร็จสิ้น!");
}

run();
