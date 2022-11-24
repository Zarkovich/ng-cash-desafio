import { Request, Response } from "express";
import { AuthenticateUserCreate } from "./authenticateUser";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserCreate = new AuthenticateUserCreate();

    const token = await authenticateUserCreate.execute({
      username,
      password,
    });

    return response.json({
      token: token,
    });
  }
}

export { AuthenticateUserController };
