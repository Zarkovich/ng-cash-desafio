import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import key from "../keys";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken)
    return response.status(401).json({
      message: "Token is missing",
    });

  //Remove Bearer do token

  const [, token] = authToken.split(" ");

  if (!key.crypto_key) throw new Error("System Error");

  try {
    verify(token, key.crypto_key);

    return next();
  } catch (e) {
    return response.status(401).json({
      message: "Token invalid",
    });
  }
}
