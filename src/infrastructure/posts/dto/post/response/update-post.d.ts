import { PickType } from '@nestjs/swagger';

export type IUpdatePost = OmitType<
  IGetPostOfUser,
  ['id', 'authorId', 'createdAt']
>;

export class IUpdateReaction extends PickType(IGetPostOfUser, ['reactions']) {}
