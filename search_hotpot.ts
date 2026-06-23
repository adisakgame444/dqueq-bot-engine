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

async function searchHotpot() {
    console.log("🔎 กำลังสแกนหาร้าน 'Hotpot Man' จากระบบ QueQ...");
    
    // ลอง Endpoint ต่างๆ เผื่ออันใดอันนึงเวิร์ค
    const endpoints = [
        "/zone/get_store_all",
        "/dqueue/zone/get_store_all",
        "/store/all",
        "/dqueue/store/all"
    ];

    for (const ep of endpoints) {
        process.stdout.write(`ลองดึงข้อมูลจาก ${ep} ... `);
        const res = await apiRequest(ep);
        
        if (res.status === 200) {
            console.log("✅ ทะลวงผ่าน!");
            
            // หา array ของข้อมูลร้าน
            let shops = [];
            if (Array.isArray(res.data)) shops = res.data;
            else if (res.data && Array.isArray(res.data.data)) shops = res.data.data;
            else if (res.data && Array.isArray(res.data.store)) shops = res.data.store;
            
            if (shops.length > 0) {
                console.log(`เจอข้อมูลทั้งหมด ${shops.length} ร้าน กำลังค้นหาคำว่า Hotpot...`);
                const hotpotShops = shops.filter(s => {
                    const name = (s.shop_name_th || s.name || "").toLowerCase();
                    return name.includes("hotpot") || name.includes("ฮอทพอท") || name.includes("ฮอตพอต");
                });
                
                if (hotpotShops.length > 0) {
                    console.log("\n🎉 เจอแล้วครับลูกพี่! รายชื่อสาขา Hotpot Man:");
                    hotpotShops.forEach(s => {
                        console.log(`- สาขา: ${s.shop_name_th || s.name} | Shop ID: ${s.id_res_auto || s.id} | Zone ID: ${s.zone_id || 0}`);
                    });
                    return; // จบการทำงาน
                } else {
                    console.log("❌ ไม่เจอร้านที่ชื่อคล้าย Hotpot เลยครับ (อาจจะอยู่ไกลไป)");
                }
            } else {
                console.log("❌ ข้อมูลที่ส่งมาไม่มีรายชื่อร้านเลย");
            }
        } else {
            console.log(`❌ ไม่ผ่าน (Status: ${res.status})`);
        }
    }
    
    console.log("\n⚠️ หาไม่เจอสักทางเลยครับ เราอาจจะต้องเปลี่ยนไปดึงพิกัด (lat/lng) หรือใช้ API ค้นหาเฉพาะ (search)");
}

searchHotpot();
