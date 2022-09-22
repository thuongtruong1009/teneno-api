import { DefaultDto } from 'src/core/common/dto';

export type ICreateComment = Pick<
    CommentEntity,
    'id' | 'text' | 'type' | 'authorId' | 'postId'
> &
    DefaultDto & {
        reactions: Json[];
        replies: Json[];
    };
