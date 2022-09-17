import { OmitType } from '@nestjs/swagger';
import { DefaultDto } from 'src/core/common/dto';
import { PostEntity } from 'src/infrastructure/posts/entities/post.entity';

export type IGetPostOfUser = DefaultDto &
    Omit<PostEntity, 'postId' | 'favouritorId' | 'reactionType'> & {
        reactions:
            | {
                  id: string;
                  type: number;
                  userId: string;
                  postId: string;
              }[]
            | null;
    };

export type IGetPublicPost = OmitType<IGetPostOfUser, ['published']>;
