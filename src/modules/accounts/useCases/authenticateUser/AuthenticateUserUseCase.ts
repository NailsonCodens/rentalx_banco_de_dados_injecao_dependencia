import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAuthenticateDTO } from "../../dtos/IAuthenticateDTO";
import { IResponseTokenDTO } from "../../dtos/IResponseTokenDTO";
import { IUserRepository } from "../../repositories/IUsersRepository";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private userRepository: IUserRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateDTO): Promise<IResponseTokenDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorret");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorret");
    }

    const token = sign({}, "cba398dbf76229c34e317e07870e8515", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponseTokenDTO = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
