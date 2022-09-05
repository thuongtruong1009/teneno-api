import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOnePost {
  @IsString()
  @IsNotEmpty()
  postId: string;
}
