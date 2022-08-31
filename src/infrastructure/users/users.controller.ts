import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiRequestTimeoutResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetCurrentUserId, Public } from 'src/infrastructure/auth/decorators';
import { LoginDto } from 'src/infrastructure/auth/dto';
import { RoleDecorator } from 'src/core/roles';
import { ROLE } from 'src/core/roles/roles.enum';
import {
  PaginationDto,
  UserAvatarDto,
  UserCoverDto,
  UserProfileDto,
} from './dto';
import { UsersService } from './users.service';
import {
  IAllUsers,
  IFindUserByEmail,
  IGetUserProfile,
  IPublicUser,
  IUpdateAvatar,
  IUpdateCover,
} from './dto/response';

@ApiTags('Users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({
  description: 'Not Found.',
  type: Error,
})
@ApiMethodNotAllowedResponse({ description: 'Method Not Allowed.' })
@ApiNotAcceptableResponse({
  description: 'Provided fields are not in correct form.',
})
@ApiRequestTimeoutResponse({ description: 'Request Timeout.' })
@ApiConflictResponse({
  description: 'Conflict existed.',
})
@ApiTooManyRequestsResponse({ description: 'Too Many Requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Public()
  @Get('profile/:userIdOrUsername')
  @ApiOperation({ summary: 'Get public user by user-id or username (all)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async getPublicUserByIdOrUsername(
    @Param('userIdOrUsername') userIdOrUsername: string,
  ): Promise<IPublicUser> {
    return this.usersService.getPublicUserByIdOrUsername(userIdOrUsername);
  }

  @Public()
  @Get('find/:email')
  @ApiOperation({ summary: 'Find user account by email' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<IFindUserByEmail> {
    return this.usersService.getUserByEmail(email);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user profile by user-id (all)',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async getUserProfile(
    @GetCurrentUserId() userId: string,
  ): Promise<IGetUserProfile> {
    return this.usersService.getUserProfile(userId);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async updateUsersProfile(
    @GetCurrentUserId() userId: string,
    @Body() dto: UserProfileDto,
  ): Promise<IPublicUser> {
    return this.usersService.updateUsersProfile(userId, dto);
  }

  @Put('profile/avatar')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user avatar image by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async updateUsersAvatar(
    @GetCurrentUserId() userId: string,
    @Body() dto: UserAvatarDto,
  ): Promise<IUpdateAvatar> {
    return this.usersService.updateUsersAvatar(userId, dto);
  }

  @Put('profile/cover')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user cover image by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async updateUsersCover(
    @GetCurrentUserId() userId: string,
    @Body() dto: UserCoverDto,
  ): Promise<IUpdateCover> {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user profile by email & password' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async deleteUser(
    @GetCurrentUserId() userId: string,
    @Body() dto: LoginDto,
  ): Promise<string> {
    return this.usersService.deleteUser(userId, dto);
  }
}
