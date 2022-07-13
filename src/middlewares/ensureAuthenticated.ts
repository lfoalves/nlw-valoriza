import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response:Response, next:NextFunction) {

  // Receber o Token. onde e como
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido. Requisição rota sem token.
  if (!authToken) {
    return response.status(401).end();
  }

  const [,token] = authToken.split(" ");

  try {
    // Validar se o token é valido. Não expirado.
    const { sub } = verify( token , "d6d04c8cd65acdff9cbc17d73ee6a48e") as IPayload;
    
    // Recupera informações do usuário.
    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).end();

  }

}

