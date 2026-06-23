import { prisma } from './src/lib/prisma';
prisma.botSession.findMany().then(res => {
  console.log(JSON.stringify(res, null, 2));
}).finally(()=>prisma.$disconnect());
