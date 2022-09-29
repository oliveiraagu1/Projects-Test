import prismaClient from "../../prisma/index";

interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHaircutService {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Error");
    }

    const myHaircuts = await prismaClient.haircut.count({
        where: {
            user_id
        }
    });

    const userPremium = await prismaClient.user.findFirst({
        where:{
            id: user_id
        },
        include: {
            subscription: true
        }
    })

    if(myHaircuts >= 3 && userPremium?.subscription?.status !== "active"){
        throw new Error("Not authorized!");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name,
        price,
        user_id,
      },
    });

    return haircut;
  }
}

export { CreateHaircutService };
