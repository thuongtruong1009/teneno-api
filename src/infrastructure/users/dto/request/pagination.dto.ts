import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProfileEntity } from '../../entities/profile.entity';

export class PaginationDto extends PickType(ProfileEntity, [
  'current',
  'limit',
  'order',
]) {}
