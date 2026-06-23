import fs from "fs";

function run() {
  const file = "./dqueue_unpacked/assets/www/main.32d8d48cd85e9cb6.js";
  const content = fs.readFileSync(file, "utf8");
  
  const postRegex = /(?:post_data|get_data|put_data|delete_data)\(["']([^"']+)["']/g;
  const foundApis = new Set<string>();
  
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    foundApis.add(match[1]);
  }

  const apis = Array.from(foundApis).sort();

  console.log(`\n🔥 ค้นพบ API Endpoints ทั้งหมดที่แอปยิงไปที่เซิร์ฟเวอร์ จำนวน ${apis.length} เส้นทาง:\n`);
  apis.forEach(a => console.log(`👉 /${a}`));
  
  fs.writeFileSync("./api_endpoints_final.txt", apis.join("\n"));
}

run();
