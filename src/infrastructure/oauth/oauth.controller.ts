import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiMethodNotAllowedResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiRequestTimeoutResponse,
    ApiTags,
    ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import {
    RESPONSES_MESSAGE,
    STATUS_MESSAGE,
    SYSTEM_ERROR,
} from 'src/core/constants';
import { Public } from '../auth/decorators';
import { OauthService } from './oauth.service';
import { Request } from 'express';

@ApiTags('OAuth')
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
@Public()
@Controller('oauth')
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    @ApiOperation({
        summary:
            'Connect to your Facebook account (not execute directly here).',
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async facebookLogin(): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    @ApiOperation({
        summary:
            'Create login callback with your Facebook account (not execute directly here).',
    })
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: RESPONSES_MESSAGE.CREATE_USER,
    })
    async facebookAuthRedirect(@Req() req: Request): Promise<any> {
        return this.oauthService.facebookLogin(req);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({
        summary: 'Connect to your Google account (not execute directly here).',
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async googleAuth(@Req() req: Request): Promise<any> {
        return req;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({
        summary:
            'Create login callback with your Google account (not execute directly here).',
    })
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: RESPONSES_MESSAGE.CREATE_USER,
    })
    async googleAuthRedirect(@Req() req: Request): Promise<any> {
        return this.oauthService.googleLogin(req);
    }

    @Get('github/redirect')
    @ApiOperation({
        summary:
            'Create login callback with your Github account (not execute directly here).',
    })
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: RESPONSES_MESSAGE.CREATE_USER,
    })
    async githubAuthRedirect(@Query() req: string) {
        return this.oauthService.githubRedirect(req);
    }
}
