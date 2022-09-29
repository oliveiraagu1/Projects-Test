import prismaClient from "../../prisma/index";

interface HaircutRequest {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}

class UpdateHaircutService {
  async execute({ user_id, haircut_id, name, price, status = true }: HaircutRequest) {

    const user = await prismaClient.user.findFirst({
        where: {
            id: user_id,
        },
        include: {
            subscription: true
        }
    })

    if(user?.subscription?.status !== 'active'){
        throw new Error('Not Authorized!');
    }

    const haircut = await prismaClient.haircut.update({
        where: {
            id: haircut_id,
        },
        data: {
            name,
            price,
            status: status === true ? true : false
        }
    })


    
    return haircut;
  }
}

export { UpdateHaircutService };
