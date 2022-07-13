import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({name, email, admin = false, password} : IUserRequest) {
    const usersRespository = getCustomRepository(UsersRepositories);

    if(!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRespository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRespository.create({
      name, email, admin, password: passwordHash,
    })

    await usersRespository.save(user);

    return user;

  }
}

export { CreateUserService }