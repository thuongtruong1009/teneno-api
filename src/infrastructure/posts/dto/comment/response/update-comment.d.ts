import { CommentEntity } from 'src/infrastructure/posts/entities/comment.entity';

export type IUpdateComment = DefaultDto & Pick<CommentEntity, 'text'>;
