import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

export class UpdatePasswordDto extends PickType(UserEntity, [
  'email',
  'oldPassword',
  'newPassword',
]) {}
