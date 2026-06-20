import { prisma } from "./lib/prisma";

async function main() {
  console.log("🚀 [Prisma Test] กำลังเชื่อมต่อและทดสอบบันทึกข้อมูล...");

  try {
    // 1. เพิ่มข้อมูลการทำงานจำลองเข้าฐานข้อมูล
    const newSession = await prisma.botSession.create({
      data: {
        email: "test_senior@example.com",
        password: "securepassword123",
        displayName: "Senior Tester",
        regStatus: "OFFLINE",
        queueStatus: "IDLE",
        targetShopName: "Test Shop",
      },
    });

    console.log("✅ 1. บันทึกข้อมูลสำเร็จ! ข้อมูลที่ได้:");
    console.dir(newSession);

    // 2. ดึงข้อมูลออกมาตรวจสอบ
    const sessions = await prisma.botSession.findMany({
      where: { email: "test_senior@example.com" },
    });

    console.log(`✅ 2. ดึงข้อมูลสำเร็จ! พบรายการทดสอบจำนวน: ${sessions.length} รายการ`);

    // 3. ลบข้อมูลทดสอบออกเพื่อสุขอนามัยที่ดีของฐานข้อมูล
    await prisma.botSession.deleteMany({
      where: { email: "test_senior@example.com" },
    });
    console.log("🧹 3. ทำการเคลียร์ข้อมูลทดสอบออกจากฐานข้อมูลเรียบร้อย!");

    console.log("\n⭐️ [Prisma Success] การทดสอบเชื่อมต่อ Prisma Database ทำงานสมบูรณ์ 100%!");
  } catch (error: any) {
    console.error("❌ [Prisma Error] เกิดความผิดพลาดระหว่างเชื่อมต่อฐานข้อมูล:");
    console.error(error.message);
  } finally {
    // ปิดการเชื่อมต่อ
    await prisma.$disconnect();
  }
}

main();
