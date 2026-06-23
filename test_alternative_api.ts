import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

function apiRequest(hostname: string, path: string): Promise<any> {
    return new Promise((resolve) => {
        const options = {
            hostname: hostname,
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
    console.log("🚀 กำลังทดสอบหา API เซิร์ฟเวอร์อื่นที่ซ่อนอยู่ (app.deltafood.me)...");
    
    const hosts = ["app.deltafood.me"];
    const paths = [
        "/api/API_customer6/zone/get_store_all",
        "/api/API_customer6/dqueue/zone/get_store_all",
        "/api/API_customer6/get_store_all",
        "/api/API_customer6/dqueue/zone/within-radius?lat=13.7563&lng=100.5018&radius=9999",
        "/api/API_customer6/zone/within-radius?lat=13.7563&lng=100.5018&radius=9999"
    ];
    
    let found = false;
    for (const host of hosts) {
        for (const path of paths) {
            process.stdout.write(`ลองยิงไปที่ ${host}${path} ... `);
            const res = await apiRequest(host, path);
            if (res.status === 200) {
                console.log("✅ ทะลุแล้ว!!");
                console.log(String(res.data).substring(0, 200));
                found = true;
                break;
            } else {
                console.log(`❌ 404 (ไม่พบ)`);
            }
        }
        if (found) break;
    }
    
    if (!found) {
        console.log("\n❌ เซิร์ฟเวอร์สำรองก็ยังเข้าไม่ได้ครับ");
    }
}

run();
