import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "./users.entity";
import {v4 as uuid} from 'uuid';

export interface AddUserData {
  name: string;
  email: string;
  password: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  
  async getByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({
      name: username,
    });
  }

  async userExists(user: AddUserData): Promise<boolean> {
    return (
      (await this.usersRepository
        .createQueryBuilder()
        .where('LOWER(name) = :name OR LOWER(email) = :email', {
          name: user.name.toLowerCase(),
          email: user.email.toLowerCase(),
        })
        .getOne()) !== null
    );
  }

  async addUser(user: AddUserData): Promise<User> {
    const userEntity = new User();
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.token = uuid(32);
    if (user.password) userEntity.password = user.password;
    return this.usersRepository.save(userEntity);
  }
}
