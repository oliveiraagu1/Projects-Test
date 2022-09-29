import prismaClient from "../../prisma/index";

interface UserProps {
  haircut_id: string;
}

class DetailHaircutService {
  async execute({ haircut_id }: UserProps) {
    const haircut = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id,
      },
    });

    return haircut;
  }
}

export { DetailHaircutService };
