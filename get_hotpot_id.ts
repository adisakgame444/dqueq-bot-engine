import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

function apiRequest(): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: 'app.deltafood.me',
            port: 443,
            path: '/api/API_customer6/zone/get_store_all',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'QueQ/10.0.0 (Android 9)',
                'Accept': 'application/json'
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
    console.log("🚀 [ภารกิจล่า Shop ID] เจาะเซิร์ฟเวอร์สำรอง (app.deltafood.me) ทะลุแล้ว!");
    console.log("📥 กำลังดึงรายชื่อร้านอาหารทั้งหมดมาวิเคราะห์หา 'Hotpot Man'...");
    
    const res = await apiRequest();
    
    if (res.status === 200 && res.data) {
        let shops = [];
        
        // งัดข้อมูลออกมาจาก Array หรือ Object
        if (Array.isArray(res.data)) shops = res.data;
        else if (res.data.data && Array.isArray(res.data.data)) shops = res.data.data;
        else if (res.data.store && Array.isArray(res.data.store)) shops = res.data.store;
        
        if (shops.length > 0) {
            console.log(`✅ ดึงข้อมูลสำเร็จ! พบร้านอาหารในระบบทั้งหมด ${shops.length} ร้าน`);
            console.log("🔎 กำลังคัดกรองเฉพาะร้าน Hotpot Man...");
            
            const hotpotShops = shops.filter(s => {
                const name = (s.shop_name_th || s.name || "").toLowerCase();
                return name.includes("hotpot") || name.includes("ฮอทพอท") || name.includes("พรานนก");
            });
            
            if (hotpotShops.length > 0) {
                console.log("\n🎉🎉🎉 เจอแล้วครับลูกพี่!!! จิ๊กซอว์ชิ้นสุดท้ายของเรา! 🎉🎉🎉");
                hotpotShops.forEach(s => {
                    const name = s.shop_name_th || s.name;
                    const id = s.id_res_auto || s.id;
                    const zone = s.zone_id || 0;
                    console.log("-----------------------------------------");
                    console.log(`🏪 ชื่อร้าน: ${name}`);
                    console.log(`🔑 Shop ID: ${id}`);
                    console.log(`📍 Zone ID: ${zone}`);
                    console.log("-----------------------------------------");
                });
                console.log("\n🔥 เอา Shop ID ด้านบนนี้ ไปเสียบจองคิวได้เลยครับลูกพี่!!!");
            } else {
                console.log("\n❌ ดึงข้อมูลร้านมาได้เพียบ แต่หาร้าน Hotpot Man ไม่เจอครับ (อาจจะไม่มีในลิสต์นี้)");
            }
        } else {
            console.log("\n❌ ดึงข้อมูลผ่าน 200 OK แต่ไม่มีรายชื่อร้านส่งกลับมาเลยครับ (Array ว่างเปล่า)");
            console.log("ตัวอย่างข้อมูลที่ได้:", JSON.stringify(res.data).substring(0, 300));
        }
    } else {
        console.log(`❌ ดึงข้อมูลไม่ผ่าน (Status: ${res.status})`);
    }
}

run();
