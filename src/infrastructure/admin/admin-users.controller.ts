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
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { EROLE, STATUS_MESSAGE, SYSTEM_ERROR } from 'src/core/constants';
import { RoleDecorator } from 'src/core/roles';
import { Public } from '../auth/decorators';
import {
    UpdateUserAvatarDto,
    UpdateUserCoverDto,
    UpdateUserProfileDto,
} from '../users/dto/request';
import {
    IAllUsers,
    IGetUserProfile,
    IPublicUser,
    IUpdateAvatar,
    IUpdateCover,
} from '../users/dto/response';
import { UsersService } from '../users/users.service';

@ApiTags('Admin')
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
@Controller('admin')
export class AdminUsersController {
    constructor(private readonly usersService: UsersService) {}

    @RoleDecorator(EROLE.ADMIN)
    @Get('users/all')
    @ApiOperation({ summary: 'Get list all public users' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async getAllUsers(@Query() dto: PaginationDto): Promise<IAllUsers> {
        return this.usersService.getAllUsers(dto);
    }

    @Public()
    @Get('users/:userId')
    @ApiOperation({
        summary: 'Get user profile by user-id',
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async getUserProfile(
        @Param('userId') userId: string,
    ): Promise<IGetUserProfile> {
        return this.usersService.getUserProfile(userId);
    }

    @Patch('users/profile/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user profile' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Success' })
    async update(
        @Param('userId') userId: string,
        @Body() dto: UpdateUserProfileDto,
    ): Promise<IPublicUser> {
        return this.usersService.updateUsersProfile(userId, dto);
    }

    @Put('users/avatar/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user avatar image' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async updateUsersAvatar(
        @Param() userId: string,
        @Body() dto: UpdateUserAvatarDto,
    ): Promise<IUpdateAvatar> {
        return this.usersService.updateUsersAvatar(userId, dto);
    }

    @Put('users/cover/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user cover image' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async updateUsersCover(
        @Param() userId: string,
        @Body() dto: UpdateUserCoverDto,
    ): Promise<IUpdateCover> {
        return this.usersService.updateUsersCover(userId, dto);
    }

    @Delete('users/:userId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user by user-id' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async deleteUserById(@Param('userId') userId: string): Promise<string> {
        return this.usersService.deleteUserById(userId);
    }
}
