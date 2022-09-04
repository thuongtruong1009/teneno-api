import { PickType } from '@nestjs/swagger';
import { ProfileEntity } from '../../entities/profile.entity';

export class UpdateUserAvatarDto extends PickType(ProfileEntity, ['avatar']) {}

export class UpdateUserCoverDto extends PickType(ProfileEntity, ['cover']) {}

export class UpdateUserProfileDto extends ProfileEntity {}
