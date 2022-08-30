import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/infrastructure/auth/entities/user.entity';

export class GetUserProfileByEmailNameDto extends PickType(UserEntity, [
  'email',
  'username',
]) {}
