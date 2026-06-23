import fs from "fs";

function run() {
  const file = "./dqueue_unpacked/assets/www/main.32d8d48cd85e9cb6.js";
  if (!fs.existsSync(file)) {
    console.log("❌ ไม่พบไฟล์ main.js");
    return;
  }

  console.log("🔎 กำลังสแกนหา Endpoint Path (เส้นทางย่อยของ API) จากไฟล์หลัก...");
  const content = fs.readFileSync(file, "utf8");
  
  // ดึงข้อความที่อยู่ในเครื่องหมายคำพูด (String Literals) ทั้งหมด
  const stringRegex = /(["'`])(.*?)\1/g;
  const foundStrings = new Set<string>();
  
  let match;
  while ((match = stringRegex.exec(content)) !== null) {
    const str = match[2];
    // กรองเอาเฉพาะ String ที่มีความยาวพอสมควร และมีหน้าตาคล้ายๆ Endpoint (มี / หรือ _ หรือคำเกี่ยวกับการจอง)
    if (str.length > 2 && str.length < 100) {
      if (
        str.includes("queue") || 
        str.includes("book") || 
        str.includes("reserve") || 
        str.includes("shop") || 
        str.includes("branch") || 
        str.includes("customer") ||
        str.includes("ticket") ||
        (str.startsWith("/") && str.length > 4 && !str.includes(" ")) ||
        str.includes("api")
      ) {
        // กรองขยะที่เป็นโค้ด HTML/CSS ออก
        if (!str.includes("<") && !str.includes("{") && !str.includes("px") && !str.includes("color:")) {
           foundStrings.add(str);
        }
      }
    }
  }

  // จัดหมวดหมู่
  const paths = Array.from(foundStrings).filter(p => !p.startsWith("http"));
  
  const keywords = ["book", "queue", "reserve", "ticket"];
  const highlyLikely = paths.filter(p => keywords.some(k => p.toLowerCase().includes(k)));

  console.log(`\n🔥 ค้นพบ Path ที่น่าจะเป็น API จองคิว (เรียงตามความน่าจะเป็น):`);
  console.log("==================================================");
  highlyLikely.forEach(p => console.log(`👉 ${p}`));
  
  console.log("\n📁 Path ย่อยอื่นๆ ที่เกี่ยวข้องกับร้าน/สาขา:");
  const shopPaths = paths.filter(p => p.toLowerCase().includes("shop") || p.toLowerCase().includes("branch"));
  shopPaths.forEach(p => console.log(`👉 ${p}`));

  fs.writeFileSync("./api_paths_found.txt", highlyLikely.join("\n") + "\n\n" + shopPaths.join("\n"));
  console.log("\n✅ บันทึกผลลัพธ์ลงไฟล์ api_paths_found.txt เรียบร้อยครับ!");
}

run();
