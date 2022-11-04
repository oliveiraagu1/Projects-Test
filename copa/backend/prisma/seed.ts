import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "teste",
      email: "teste@teste.com",
      avatarUrl: "https://github.com/oliveira.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Exemple pool",
      code: "BOL123",
      ownerId: user.id,
      participant: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-05T19:23:29.746Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-12T19:23:29.746Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
      guesses: {
        create: {
            firstTeamPoints: 5,
            secondTeamPoints: 0,

            Participant: {
                connect: {
                    userId_poolId: {
                        userId: user.id,
                        poolId: pool.id
                    }
                }
            }
        }
      }
    }
  })
}

main();
