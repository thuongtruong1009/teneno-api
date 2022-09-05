import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PostEntity {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  files: string[];

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  favouritorId: string;

  @IsNumber()
  @IsNotEmpty()
  reactionType: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
