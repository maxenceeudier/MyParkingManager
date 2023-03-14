import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "src/users/users.entity";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../users/users.service";
import { BadRequestException } from "@nestjs/common";
import { RegisterUserDto } from "src/users/register-user.dto";

export interface ResponseLogin {
  name: string,
  token: string,
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    ){}

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.usersService.getByUsername(username);
        if (
          user &&
          user?.password !== null &&
          (await bcrypt.compare(pass, user.password))
        ) {
          return user;
        }
        return null;
    }

    async createUser(user: RegisterUserDto): Promise<User> {
        if (await this.usersService.userExists({ ...user, name: user.username }))
          throw new BadRequestException('`username` or `email` is already in use');
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return this.usersService.addUser({ ...user, name: user.username });
    }

    async login(user: User): Promise<ResponseLogin> {
        const userLogin = await this.usersRepository.findOne({
            where: {
                name: user.name,
            }
        });
        if (!userLogin)
            throw new BadRequestException('user not found');
       return {name: user.name, token: userLogin.token}
    }

}