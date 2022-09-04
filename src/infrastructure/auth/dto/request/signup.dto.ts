import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../users/entities/user.entity';

export class SignupDto extends PickType(UserEntity, [
  'email',
  'password',
  'username',
]) {}
