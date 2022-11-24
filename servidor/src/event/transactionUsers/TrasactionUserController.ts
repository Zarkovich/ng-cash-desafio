import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { TransactionUserEvent } from "./TransactionUserEvent";
import key from "../../keys";

class TransactionUserController {
  async handle(request: Request, response: Response) {
    const { creditUsername, value } = request.body;

    const authToken = request.headers.authorization;

    if (!authToken)
      return response.status(401).json({
        message: "Token is missing",
      });

    if (!key.crypto_key) throw new Error("System Error");

    const [, token] = authToken?.split(" ");
    const tokenVerify = verify(token, key.crypto_key);

    if (typeof tokenVerify.sub != "string") throw new Error("System Error");

    const transactionUserEvent = new TransactionUserEvent();

    const transaction = await transactionUserEvent.execute({
      creditUsername,
      debitId: parseInt(tokenVerify.sub),
      value,
    });

    return response.json(transaction);
  }
}

export { TransactionUserController };
