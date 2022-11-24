import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import key from "../../keys";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserCreate {
  async execute({ username, password }: IRequest) {
    //Verificar se o usuário existe
    const userExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) throw new Error("User or password incorrect");

    //Verificar se a senha está correta

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) throw new Error("User or password incorrect");

    //Gerar Token do usuário

    if (!key.crypto_key) throw new Error("System Error");

    const token = sign({}, key.crypto_key, {
      subject: userExists.id.toString(),
      expiresIn: "1h",
    });

    return token;
  }
}

export { AuthenticateUserCreate };
