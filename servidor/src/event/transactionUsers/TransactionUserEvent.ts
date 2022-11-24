import { client } from "../../prisma/client";
import dayjs from "dayjs";

interface ITransact {
  debitId: number;
  creditUsername: string;
  value: string;
}

class TransactionUserEvent {
  async execute({ creditUsername, debitId, value }: ITransact) {
    //Verificar a existência da pessoa que quero transferir.
    const creditUsernameExits = await client.user.findFirst({
      where: {
        username: creditUsername,
      },
    });

    if (!creditUsernameExits) throw new Error("Usuário não encontrado!");
    if (creditUsernameExits.id === debitId)
      throw new Error("Transferência para mesma conta proibida");

    //Pegar a conta do credit

    const accountCredit = await client.account.findFirst({
      where: {
        userId: creditUsernameExits.id,
      },
    });

    //Verificar se a quantia está contida no balance do debit.
    const accountDebitUser = await client.account.findFirst({
      where: {
        userId: debitId,
      },
    });

    if (accountDebitUser?.balance) {
      if (
        parseFloat(accountDebitUser.balance.toString()) <
        parseFloat(value)
      )
        throw new Error("Saldo insuficiente");

      //Transferir valor
      const accountBalanceUpdateDebit = await client.account.update({
        where: {
          userId: accountDebitUser.id,
        },
        data: {
          balance:
            parseFloat(accountDebitUser.balance.toString()) -
            parseFloat(value),
        },
      });

      await client.account.update({
        where: {
          userId: creditUsernameExits.id,
        },
        data: {
          balance:
            parseFloat(accountCredit!.balance.toString()) +
            parseFloat(value),
        },
      });

      const transaction = await client.transaction.create({
        data: {
          createdAt: dayjs().toDate(),
          crediteAccountId: creditUsernameExits.id,
          value: parseFloat(value),
          debitedAccountId: debitId,
        },
      });

      return { accountBalanceUpdateDebit, transaction };
    }

    return {};
  }
}

export { TransactionUserEvent };
