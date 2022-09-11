import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    Redirect,
    Req,
    Res,
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
    ApiOAuth2,
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
} from 'src/core/constants/status-message';
import { Public } from '../auth/decorators';
import { OauthService } from './oauth.service';

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
    private access_token: string;
    constructor(private readonly oauthService: OauthService) {}

    @Get('google')
    @ApiOAuth2(['user:read'])
    @UseGuards(AuthGuard('google'))
    @ApiOperation({
        summary: 'Connect to your Google account (not execute directly).',
    })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    async googleAuth(@Req() req) {
        return req;
    }

    @Get('google/redirect')
    @ApiOAuth2(['user:write'])
    @UseGuards(AuthGuard('google'))
    @ApiOperation({
        summary:
            'Create login callback with your Google account (not execute directly).',
    })
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: RESPONSES_MESSAGE.CREATE_USER,
    })
    googleAuthRedirect(@Req() req) {
        return this.oauthService.googleLogin(req);
    }

    // ------------------------------------------------------

    @Get('github/redirect')
    // @Redirect('/success', 302)
    async githubAuthRedirect(@Query() req: string) {
        return this.oauthService.githubRedirect(req);
    }
}
