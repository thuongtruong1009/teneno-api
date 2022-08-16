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
  SetMetadata,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/infrastructure/auth/common/decorators';
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
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get list all public user (all)' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  getAllUsers(@Query() dto: PaginationDto) {
    return this.usersService.getAllUsers(dto);
  }

  @Get(':userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user profile by user id (all)' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  getUsersById(@Param('userId') userId: string) {
    return this.usersService.getUsersById(userId);
  }

  @Put('profile/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile by user id (user)' })
  @ApiResponse({
    status: 200,
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
  @ApiResponse({
    status: 200,
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
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  updateUsersCover(@Param('userId') userId: string, @Body() dto: UserCoverDto) {
    return this.usersService.updateUsersCover(userId, dto);
  }

  @Delete('profile/:userId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user profile by email & password (user)' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {}, message: ""',
  })
  deleteUserByEmail(@Param('userId') userId: string, @Body() dto: LoginDto) {
    return this.usersService.deleteUserByEmail(userId, dto);
  }

  @Delete(':userId')
  @RoleDecorator(ROLE.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user by user-id (admin)' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {}, message: ""',
  })
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUserById(userId);
  }
}
