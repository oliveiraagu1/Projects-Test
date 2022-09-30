import prismaClient from "../../prisma/index";

interface CheckSubscriptionRequest {
  user_id: string;
}

class CheckSubscriptionService {
  async execute({ user_id }: CheckSubscriptionRequest) {

    const status = await prismaClient.user.findFirst({
        where: {
            id:user_id,
        },
        select: {
            subscription: {
                select: {
                    id: true,
                    status: true
                }
            }
        }
    })
    
    return status;
  }
}

export { CheckSubscriptionService };
