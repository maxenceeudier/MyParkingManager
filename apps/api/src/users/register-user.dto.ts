import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';


export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  username!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(72)
  password!: string;
}