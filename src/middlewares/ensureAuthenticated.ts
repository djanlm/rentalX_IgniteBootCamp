import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  //bearer token
  const [, token] = authHeader.split(" "); //nao precisamos da primeira posicao

  try {
    const { sub: user_id } = verify(token, "a4c2c19d4994df76fffccf3c24f83c28") as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    // aqui passamos o usuário pra dentro do request
    request.user = {
      id: user_id
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401)
  }


}