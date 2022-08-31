import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
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
import { ROLE, RoleDecorator } from 'src/core/roles';
import { Public } from '../auth/decorators';
import { PaginationDto } from '../users/dto';
import { IAllUsers, IGetUserProfile } from '../users/dto/response';
import { UsersService } from '../users/users.service';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/request/update-admin.dto';

@ApiTags('Admin')
@ApiBearerAuth()
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
@RoleDecorator(ROLE.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
  ) {}

  @Get('users/all')
  @ApiOperation({ summary: 'Get list all public users' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async getAllUsers(@Query() dto: PaginationDto): Promise<IAllUsers> {
    return this.usersService.getAllUsers(dto);
  }

  @Get('users/:userId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user profile by user-id',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<IGetUserProfile> {
    return this.usersService.getUserProfile(userId);
  }

  @Patch('users/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(userId, updateAdminDto);
  }

  @Delete('users/:userId')
  @ApiOperation({ summary: 'Delete user by user-id (admin)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Success',
  })
  async deleteUserById(@Param('userId') userId: string): Promise<string> {
    return this.usersService.deleteUserById(userId);
  }
}
