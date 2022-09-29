import prismaClient from "../../prisma/index";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new Error("Email/User incorrect");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      throw new Error("Email/User incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      endereco: user?.endereco,
      token,
      subscriptions: user?.subscription ? {
        id: user?.subscription?.id,
        status: user?.subscription?.status
      }: null
    };
  }
}

export { AuthUserService };
