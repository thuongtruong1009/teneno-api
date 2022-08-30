import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
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
import { GetCurrentUserId, Public } from 'src/infrastructure/auth/decorators';
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

  @Get('all')
  @RoleDecorator(ROLE.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list all public user (admin)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async getAllUsers(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @Public()
  @Get(':userId')
  @ApiOperation({ summary: 'Get public user by user id (all)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async getUsersById(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.usersService.getUsersById(userId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user profile by user email and username (user)',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async getUsersByEmailAndName(@Body() dto: GetUserProfileByEmailNameDto) {
    return this.usersService.getUsersByEmailAndName(dto);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async updateUsersProfile(
    @GetCurrentUserId() userId: string,
    @Body() dto: UserProfileDto,
  ) {
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
  ) {
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
  ) {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user profile by email & password (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async deleteUserByEmail(
    @GetCurrentUserId() userId: string,
    @Body() dto: LoginDto,
  ) {
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
  async deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
