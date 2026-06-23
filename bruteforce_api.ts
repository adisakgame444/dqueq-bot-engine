import fs from "fs";
import https from "https";

const tokenFile = fs.readFileSync("extracted_tokens.txt", "utf8").trim();
const token = tokenFile.split('\n')[0];

const prefixes = [
    "/dqueue/",
    "/api/dqueue/",
    "/v4/dqueue/",
    "/api/v4/dqueue/",
    "/api/",
    "/v4/",
    "/api/v4/",
    "/"
];

const endpoints = [
    "users-reservations/myqueue",
    "users/check",
    "get_session"
];

const methods = ["GET", "POST"];

async function testEndpoint(path: string, method: string): Promise<number> {
    return new Promise((resolve) => {
        const options = {
            hostname: 'backend4.deltaapiservice.com',
            port: 443,
            path: path,
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
                if (res.statusCode !== 404 && res.statusCode !== 405) {
                    console.log(`\n🎉 BINGO!! เจอเป้าหมายแล้ว!`);
                    console.log(`URL: https://backend4.deltaapiservice.com${path}`);
                    console.log(`Method: ${method}`);
                    console.log(`Status: ${res.statusCode}`);
                    console.log(`Response: ${data.substring(0, 300)}`);
                    resolve(res.statusCode || 0);
                } else {
                    resolve(res.statusCode || 0);
                }
            });
        });

        req.on('error', () => resolve(0));
        if (method === "POST") req.write("{}");
        req.end();
    });
}

async function runBruteforce() {
    console.log("🚀 กำลังสแกนหา URL ที่ซ่อนอยู่แบบปูพรม...");
    for (const endpoint of endpoints) {
        for (const prefix of prefixes) {
            for (const method of methods) {
                const fullPath = (prefix + endpoint).replace(/\/\//g, '/');
                process.stdout.write(`ทดสอบ ${method} ${fullPath} ... `);
                const status = await testEndpoint(fullPath, method);
                if (status !== 404 && status !== 405) {
                    process.stdout.write(`[${status}] FOUND!\n`);
                    return; // Stop on first success
                } else {
                    process.stdout.write(`[${status}]\n`);
                }
            }
        }
    }
    console.log("❌ สแกนเสร็จแล้ว ไม่เจออันที่ผ่านเลยครับ (อาจจะต้องหา Base URL ใหม่)");
}

runBruteforce();
