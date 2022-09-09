import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
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
import axios from 'axios';
import {
    RESPONSES_MESSAGE,
    STATUS_MESSAGE,
    SYSTEM_ERROR,
} from 'src/core/constants/status-message';
import { AuthService } from '../auth/auth.service';
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
    githubAuthRedirect(@Req() req, @Res() res) {
        const requestToken = req.query.code;
        // axios({
        //     method: 'post',
        //     url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${requestToken}`,
        //     headers: {
        //         accept: 'application/json',
        //     },
        // }).then((response) => {
        //     this.access_token = response.data.access_token;
        //     return response;
        // });

        axios({
            method: 'get',
            url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`,
            headers: {
                accept: 'application/json',
            },
        }).then((response) => {
            this.access_token = response.data.access_token;
            console.log(response);
            return response;
        });
    }

    @Get('success')
    githubSuccess(@Req() req, @Res() res) {
        axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
                Authorization: 'token ' + this.access_token,
            },
        }).then((response) => {
            res.render('pages/success', { userData: response.data });
        });
    }
}
