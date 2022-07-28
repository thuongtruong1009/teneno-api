import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileDto } from './dto';
import { IUserProfile } from './type/user-profile';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('profile')
  updateUsersProfile(@Body() dto: UserProfileDto) {
    return this.usersService.updateUsersProfile(dto);
  }

  @Get(':userId')
  getUsersById(@Param('userId') userId: string) {
    return this.usersService.getUsersById(userId);
  }
}
