import { PickType } from '@nestjs/swagger';
import { ProfileEntity } from '../../entities/profile.entity';

export class UserCoverDto extends PickType(ProfileEntity, ['cover']) {}
