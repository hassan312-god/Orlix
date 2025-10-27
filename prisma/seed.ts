import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orlix.dev' },
    update: {},
    create: {
      email: 'admin@orlix.dev',
      fullName: 'Orlix Admin',
      role: 'admin',
      credits: 100
    }
  });

  await prisma.project.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo orchestration',
      description: 'Pipeline initiale Orlix',
      status: 'running',
      ownerId: admin.id,
      agents: {
        create: [
          {
            id: '00000000-0000-0000-0000-000000000010',
            name: 'Coder',
            provider: 'openai',
            configuration: { model: 'gpt-4o-mini' }
          }
        ]
      }
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
