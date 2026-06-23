import fs from "fs";

function run() {
  const file = "./dqueue_unpacked/assets/www/main.32d8d48cd85e9cb6.js";
  const content = fs.readFileSync(file, "utf8");
  
  const kw = '"users-reservations/booking"';
  let idx = content.indexOf(kw);
  
  if (idx !== -1) {
    const start = Math.max(0, idx - 400);
    const end = Math.min(content.length, idx + 400);
    let slice = content.substring(start, end);
    
    slice = slice.replace(/\{/g, "{\n  ");
    slice = slice.replace(/\}/g, "\n}\n");
    slice = slice.replace(/;/g, ";\n");
    slice = slice.replace(/,/g, ",\n  ");
    
    console.log(`\n🔥 โครงสร้างโค้ดรอบๆ API จองคิว (/users-reservations/booking):\n`);
    console.log("==================================================");
    console.log(slice);
    console.log("==================================================\n");
  }
}

run();
