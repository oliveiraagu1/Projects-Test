import prismaClient from "../../prisma/index";

interface UserProps{
  user_id: string;
}

class DetailUserService {
  async execute({ user_id }: UserProps) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        endereco: true,
        subscription: {
          select: {
            id: true,
            priceId: true,
            status: true
          }
        }
      }
    })

    return user;
  }
}

export { DetailUserService };
