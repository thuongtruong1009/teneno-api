import {
  IsArray,
  IsJSON,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CommentEntity {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsArray()
  @IsNotEmpty()
  reactions: number[];

  @IsJSON()
  @IsNotEmpty()
  replies: any[];
}
