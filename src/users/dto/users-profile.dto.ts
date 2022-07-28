import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserProfileDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;

  @IsString()
  bio: string;

  @IsBoolean()
  gender: boolean;
}
