import { OmitType } from '@nestjs/swagger';

export interface IGetAllPostsOfUser {
  id: string;
  title: string;
  description: string;
  files: string[];
  published: boolean;
  authorId: string;
  createdAt: Date;
  reactions:
    | {
        id: string;
        type: number;
        userId: string;
        postId: string;
      }[]
    | null;
}

export type IGetAllPublicPosts = OmitType<IGetAllPostsOfUser, ['published']>;
