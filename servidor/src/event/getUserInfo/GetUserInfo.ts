import { client } from "../../prisma/client";

class GetUserInfo {
  async execute(userId: number) {
    const account = await client.account.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!account) throw new Error("Usuário não encontrado");

    const { balance, id } = account;

    return { id, balance };
  }

  async getUser(userId: number) {
    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Usuário não encontrado");

    return user.username;
  }

  async transactions(userId: number) {
    const transactions = await client.transaction.findMany({
      where: {
        OR: [
          {
            debitedAccountId: userId,
          },
          {
            crediteAccountId: userId,
          },
        ],
      },
      orderBy:{
        createdAt : 'desc'
      }
    });

    return [transactions];
  }
}

export { GetUserInfo };
