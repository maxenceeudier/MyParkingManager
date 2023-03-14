import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './auth-Local.strategy';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      forwardRef(() => UsersModule)
    ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule {}