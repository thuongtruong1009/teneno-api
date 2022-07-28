import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/common/decorators';
import { UserProfileDto } from './dto';
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
  getAllUsers() {
    return this.usersService.getAllUsers();
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
}
