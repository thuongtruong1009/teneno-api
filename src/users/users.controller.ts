import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/common/decorators';
import { LoginDto } from 'src/auth/dto';
import {
  PaginationDto,
  UserAvatarDto,
  UserCoverDto,
  UserProfileDto,
} from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list all public user' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  getAllUsers(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @Get(':userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user profile by user id' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  getUsersById(@Param('userId') userId: string) {
    return this.usersService.getUsersById(userId);
  }

  @Put('profile/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile by user id' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  updateUsersProfile(
    @Param('userId') userId: string,
    @Body() dto: UserProfileDto,
  ) {
    return this.usersService.updateUsersProfile(userId, dto);
  }

  @Put('profile/avatar/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user avatar image by user id' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  updateUsersAvatar(
    @Param('userId') userId: string,
    @Body() dto: UserAvatarDto,
  ) {
    return this.usersService.updateUsersAvatar(userId, dto);
  }

  @Put('profile/cover/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user cover image by user id' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {user}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  updateUsersCover(@Param('userId') userId: string, @Body() dto: UserCoverDto) {
    return this.usersService.updateUsersCover(userId, dto);
  }

  // @Delete(':userId')
  // @ApiBearerAuth()
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Delete user by email' })
  // @ApiResponse({
  //   status: 200,
  //   description: '{code: 1, data: {}, message: ""',
  // })
  // @ApiResponse({ status: 404, description: 'Not found' })
  // deleteUserByEmail(@Param('userId') userId: string, @Body() dto: LoginDto) {
  //   return this.usersService.deleteUserByEmail(userId, dto);
  // }
}
