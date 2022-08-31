import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

export class SignupDto extends PickType(UserEntity, [
  'email',
  'password',
  'username',
]) {}
