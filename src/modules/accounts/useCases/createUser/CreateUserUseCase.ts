import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/IcreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const passwordHash = await hash(password, 8); //criptografa senha

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}

export { CreateUserUseCase }