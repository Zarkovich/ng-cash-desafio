
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { GetUserInfo } from "./GetUserInfo";
import key from "../../keys";

class GetUserInfoController {
  async handle(request: Request, response: Response) {
    const authToken = await request.headers.authorization;

    if (!authToken) return response.status(401).json({
      message: "Token is missing"
    });

    if(!key.crypto_key) throw new Error("System Error");

    const [, token] = authToken?.split(" ");    
    const userId = verify(token, key.crypto_key);

    if (typeof userId.sub != "string") throw new Error("System Error");
   

    const getUserInfo = new GetUserInfo();
    const user = await getUserInfo.getUser(parseInt(userId.sub));
    const account = await getUserInfo.execute(parseInt(userId.sub));

    const transactions = await getUserInfo.transactions(parseInt(userId.sub))

    return response.json([user,account,transactions]);
  }

}

export { GetUserInfoController };
