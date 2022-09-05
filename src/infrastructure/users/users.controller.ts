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
import { LoginDto } from 'src/infrastructure/auth/dto/request';
import {
  UpdateUserAvatarDto,
  UpdateUserCoverDto,
  UpdateUserProfileDto,
} from './dto/request';
import { UsersService } from './users.service';
import {
  IFindUserByEmail,
  IGetUserProfile,
  IPublicUser,
  IUpdateAvatar,
  IUpdateCover,
} from './dto/response';
import {
  STATUS_MESSAGE,
  SYSTEM_ERROR,
} from 'src/core/constants/status-message';

@ApiTags('Users')
@ApiUnauthorizedResponse({ description: SYSTEM_ERROR.UNAUTHORIZED })
@ApiForbiddenResponse({ description: SYSTEM_ERROR.FORBIDDEN })
@ApiNotFoundResponse({
  description: SYSTEM_ERROR.NOT_FOUND,
  type: Error,
})
@ApiMethodNotAllowedResponse({ description: SYSTEM_ERROR.METHOD_NOT_ALLOWED })
@ApiNotAcceptableResponse({
  description: SYSTEM_ERROR.NOT_ACCEPTABLE,
})
@ApiRequestTimeoutResponse({ description: SYSTEM_ERROR.REQUEST_TIMEOUT })
@ApiConflictResponse({
  description: SYSTEM_ERROR.CONFLICT,
})
@ApiTooManyRequestsResponse({ description: SYSTEM_ERROR.TOO_MANY_REQUESTS })
@ApiInternalServerErrorResponse({
  description: SYSTEM_ERROR.INTERNAL_SERVER_ERROR,
})
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
    description: STATUS_MESSAGE.SUCCESS,
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
    description: STATUS_MESSAGE.SUCCESS,
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
  @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
  async getUserProfile(
    @GetCurrentUserId() userId: string,
  ): Promise<IGetUserProfile> {
    return this.usersService.getUserProfile(userId);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
  async updateUsersProfile(
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<IPublicUser> {
    return this.usersService.updateUsersProfile(userId, dto);
  }

  @Put('profile/avatar')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user avatar image by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: STATUS_MESSAGE.SUCCESS,
  })
  async updateUsersAvatar(
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateUserAvatarDto,
  ): Promise<IUpdateAvatar> {
    return this.usersService.updateUsersAvatar(userId, dto);
  }

  @Put('profile/cover')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user cover image by user id' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: STATUS_MESSAGE.SUCCESS,
  })
  async updateUsersCover(
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateUserCoverDto,
  ): Promise<IUpdateCover> {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user profile by email & password' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
  async deleteUser(
    @GetCurrentUserId() userId: string,
    @Body() dto: LoginDto,
  ): Promise<string> {
    return this.usersService.deleteUser(userId, dto);
  }
}
