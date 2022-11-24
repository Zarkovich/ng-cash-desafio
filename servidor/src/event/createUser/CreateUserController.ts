import { Request, Response } from "express";
import { CreateUserEvent } from "./CreateUserEvent";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticationUser = new CreateUserEvent();

    const user = await authenticationUser.execute({
      username,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };
