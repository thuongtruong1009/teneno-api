import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/decorators';
import { LoginDto } from 'src/infrastructure/auth/dto';
import { RoleDecorator } from 'src/core/roles';
import { ROLE } from 'src/core/roles/roles.enum';
import {
  GetUserProfileByEmailNameDto,
  PaginationDto,
  UserAvatarDto,
  UserCoverDto,
  UserProfileDto,
} from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiNotAcceptableResponse({
  description: 'Provided inputs are not in correct form.',
})
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @RoleDecorator(ROLE.ADMIN)
  @Get('all')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list all public user (admin)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  getAllUsers(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @Public()
  @Get(':userId')
  @ApiOperation({ summary: 'Get public user by user id (all)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  getUsersById(@Param('userId') userId: string) {
    return this.usersService.getUsersById(userId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user profile by user email and username (user)',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  getUsersByEmailAndName(@Body() dto: GetUserProfileByEmailNameDto) {
    return this.usersService.getUsersByEmailAndName(dto);
  }

  @Put('profile/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  updateUsersProfile(
    @Param('userId') userId: string,
    @Body() dto: UserProfileDto,
  ) {
    return this.usersService.updateUsersProfile(userId, dto);
  }

  @Put('profile/avatar/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user avatar image by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  updateUsersAvatar(
    @Param('userId') userId: string,
    @Body() dto: UserAvatarDto,
  ) {
    return this.usersService.updateUsersAvatar(userId, dto);
  }

  @Put('profile/cover/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user cover image by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  updateUsersCover(@Param('userId') userId: string, @Body() dto: UserCoverDto) {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user profile by email & password (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  deleteUserByEmail(@Param('userId') userId: string, @Body() dto: LoginDto) {
    return this.usersService.deleteUserByEmail(userId, dto);
  }

  @RoleDecorator(ROLE.ADMIN)
  @Delete(':userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by user-id (admin)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
