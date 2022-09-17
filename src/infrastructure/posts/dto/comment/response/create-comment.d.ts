import { DefaultDto } from 'src/core/common/dto';

export type ICreateComment = Pick<
    CommentEntity,
    'id' | 'text',
    'authorId',
    'postId'
> &
    DefaultDto & {
        reactions: Json[];
        replies: Json[];
    };
