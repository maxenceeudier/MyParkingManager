import { Body, Controller, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as CurrentUser } from '../common/decorators/user.decorator';



@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 /* @Get(':name')
  async getUserByUsername(
    @Param('name') name: string,
  ): Promise<User | null> {
    return this.usersService.getUserByUsername(name);
  }*/
}