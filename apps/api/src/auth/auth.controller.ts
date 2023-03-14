import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { User } from "src/common/decorators/user.decorator";
import { User as UserEntity } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { RegisterUserDto } from "src/users/register-user.dto";
import { ResponseLogin } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    const user = await this.authService.createUser(registerUserDto);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @User() user: UserEntity,
  ): Promise<ResponseLogin> {
    return await this.authService.login(user);
  }
}
