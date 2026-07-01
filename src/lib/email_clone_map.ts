import fs from "fs";
import { dataFile } from "./data_dir";

const FILE_PATH = dataFile("email_clone_map.json");

export function getEmailCloneMap(): Record<string, number> {
  try {
    if (fs.existsSync(FILE_PATH)) {
      return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    }
  } catch (e) {
    console.error("Failed to read email clone map:", e);
  }
  // ค่าเริ่มต้นสำหรับบัญชีหลักที่คุณและลูกค้าใช้ทดสอบในระบบ
  return {
    "legiaha86916@gmail.com": 1,
    "duongducthu894@gmail.com": 2,
  };
}

export function saveEmailCloneMap(map: Record<string, number>): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(map, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to write email clone map:", e);
  }
}

export function setEmailClone(email: string, cloneAccountId: number): void {
  const map = getEmailCloneMap();
  map[email.trim().toLowerCase()] = cloneAccountId;
  saveEmailCloneMap(map);
}
