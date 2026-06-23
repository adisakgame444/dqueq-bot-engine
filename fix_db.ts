import { prisma } from './src/lib/prisma';
prisma.botSession.updateMany({
  where: { regStatus: "FILLING_FORM" },
  data: { regStatus: "REGISTERED", queueStatus: "IDLE" }
}).then(res => {
  console.log('Fixed stuck DB sessions:', res.count);
}).finally(()=>prisma.$disconnect());
