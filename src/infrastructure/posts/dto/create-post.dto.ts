import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  description: string;

  @IsArray()
  files: string[];

  @IsString()
  userId: string;
}
