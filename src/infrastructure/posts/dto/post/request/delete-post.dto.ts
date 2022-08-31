import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOnePost {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}
