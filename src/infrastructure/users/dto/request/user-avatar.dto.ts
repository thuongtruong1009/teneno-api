import { PickType } from '@nestjs/swagger';
import { ProfileEntity } from '../../entities/profile.entity';

export class UserAvatarDto extends PickType(ProfileEntity, ['avatar']) {}
