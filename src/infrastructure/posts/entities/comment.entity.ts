import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentEntity {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsJSON()
  @IsOptional()
  reactions?: JSON[];

  @IsJSON()
  @IsOptional()
  replies?: JSON[];
}
