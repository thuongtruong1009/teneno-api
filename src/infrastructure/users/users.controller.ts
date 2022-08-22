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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/common/decorators';
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

  @Public()
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list all public user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  getAllUsers(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @Get(':userId')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get public user by user id (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  getUsersById(@Param('userId') userId: string) {
    return this.usersService.getUsersById(userId);
  }

  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user profile by user email and username (user)',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  getUsersByEmailAndName(@Body() dto: GetUserProfileByEmailNameDto) {
    return this.usersService.getUsersByEmailAndName(dto);
  }

  @Put('profile/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  updateUsersProfile(
    @Param('userId') userId: string,
    @Body() dto: UserProfileDto,
  ) {
    return this.usersService.updateUsersProfile(userId, dto);
  }

  @Put('profile/avatar/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user avatar image by user id (user)' })
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user cover image by user id (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  updateUsersCover(@Param('userId') userId: string, @Body() dto: UserCoverDto) {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user profile by email & password (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  deleteUserByEmail(@Param('userId') userId: string, @Body() dto: LoginDto) {
    return this.usersService.deleteUserByEmail(userId, dto);
  }

  @Delete(':userId')
  @RoleDecorator(ROLE.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user by user-id (admin)' })
  @ApiOkResponse({
    description: 'Success',
  })
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
