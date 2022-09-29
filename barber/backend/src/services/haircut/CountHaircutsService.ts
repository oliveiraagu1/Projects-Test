import prismaClient from "../../prisma/index";

interface HaircutRequest {
  user_id: string;
}

class CountHaircutsService {
  async execute({ user_id }: HaircutRequest) {

    const count = await prismaClient.haircut.count({
        where: {
            user_id
        }
    })
    
    return count;
  }
}

export { CountHaircutsService };
