import { OmitType } from '@nestjs/swagger';

export interface IGetPostOfUser {
  id: string;
  title: string;
  description: string;
  files: string[];
  published: boolean;
  authorId: string;
  createdAt: Date;
  updateAt?: Date;
  reactions:
    | {
        id: string;
        type: number;
        userId: string;
        postId: string;
      }[]
    | null;
}

export type IGetPublicPost = OmitType<IGetPostOfUser, ['published']>;
