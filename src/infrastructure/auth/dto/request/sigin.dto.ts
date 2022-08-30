import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}
