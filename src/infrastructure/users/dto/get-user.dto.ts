import { PartialType } from '@nestjs/swagger';
import { UserProfileDto } from '.';

export class GetUserProfileByEmailNameDto extends PartialType(UserProfileDto) {
  email: string;
  username: string;
}
