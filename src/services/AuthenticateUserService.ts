import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password} : IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // verificar se email existe
    const user = await usersRepositories.findOne({
      email
    })

    if(!user) {
      throw new Error("Email/Password incorrect");
    }

    //verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //gerar token
    const token = sign({
      email: user.email}, "d6d04c8cd65acdff9cbc17d73ee6a48e", {subject: user.id, expiresIn: "1d"});

      return token;

  }
}

export { AuthenticateUserService }