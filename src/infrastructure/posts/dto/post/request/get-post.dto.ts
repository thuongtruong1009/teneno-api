import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllPostOfUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
