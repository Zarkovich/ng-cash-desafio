import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserCreate {
  username: string;
  password: string;
}

class CreateUserEvent {
  async execute({ username, password }: IUserCreate) {
    //verificar se o usuário existe
    const userExistes = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userExistes) throw new Error("Usuário já cadastrado!");

    //Cadastrar caso não exista e criptografar a senha

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    const account = await client.account.create({
      data: {
        userId: user.id,
        balance: 100.0,
      },
    });

    return { user, account };
  }
}

export { CreateUserEvent };
