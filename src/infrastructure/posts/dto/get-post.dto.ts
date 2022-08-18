import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostByUserIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
