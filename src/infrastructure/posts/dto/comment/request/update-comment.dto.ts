import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../../../entities/comment.entity';

export class UpdateCommentTextDto extends PickType(CommentEntity, [
  'id',
  'text',
]) {}
