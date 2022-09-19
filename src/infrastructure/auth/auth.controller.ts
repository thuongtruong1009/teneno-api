import {
    Body,
    CacheInterceptor,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
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
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorators';
import { RtGuard } from './guards';
import {
    LoginDto,
    RecaptchaDto,
    SignupDto,
    UpdatePasswordDto,
} from './dto/request';
import { ITokens } from './dto/response';
import {
    RESPONSES_MESSAGE,
    STATUS_MESSAGE,
    SYSTEM_ERROR,
} from 'src/core/constants';
import { Response } from 'express';

@ApiTags('Auth')
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
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        this.authService = authService;
    }

    @Public()
    @Post('signup')
    @ApiOperation({ summary: 'Create new user account.' })
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ApiCreatedResponse({
        description: RESPONSES_MESSAGE.CREATE_USER,
        type: SignupDto,
    })
    async signupLocal(@Body() dto: SignupDto): Promise<ITokens> {
        return this.authService.signupLocal(dto);
    }

    @Public()
    @Post('signin')
    @UseInterceptors(CacheInterceptor)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ApiOperation({ summary: 'Login to user account' })
    async signinLocal(@Body() dto: LoginDto): Promise<ITokens> {
        // const cookie = this.authService.createCookie(a.accessToken);
        // res.setHeader('Set-Cookie', [cookie]);
        // console.log(res.getHeader('Set-Cookie'));
        return await this.authService.signinLocal(dto);
    }

    @Post('signin/recaptcha')
    @ApiOperation({ summary: 'Login user with recaptcha' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async signInRecaptcha(@Body() dto: RecaptchaDto): Promise<ITokens> {
        return await this.authService.signInRecaptcha(dto);
    }

    @Post('logout')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ApiOperation({ summary: 'Logout user account (user)' })
    async logout(
        @GetCurrentUserId() userId: string,
        @Res() res: Response,
    ): Promise<void> {
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        return this.authService.logout(userId);
    }

    @Post('refresh')
    @ApiBearerAuth()
    @UseGuards(RtGuard)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout account on all devices' })
    async refreshToken(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<ITokens> {
        return this.authService.refreshToken(userId, refreshToken);
    }

    @Put('password')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ApiOperation({ summary: 'Update user password' })
    async updatePassWord(@Body() dto: UpdatePasswordDto): Promise<ITokens> {
        return this.authService.updatePassWord(dto);
    }
}
