import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators';
import { GithubGuard } from './guards/github.guard';
import { OauthService } from './oauth.service';

@ApiTags('OAuth')
@Public()
@Controller('oauth')
export class OauthController {
    constructor(private readonly oauthService: OauthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return req;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.oauthService.googleLogin(req);
    }

    @Get('github')
    @UseGuards(GithubGuard)
    async githubAuth(@Req() req) {
        return req;
    }

    @Get('github/redirect')
    @UseGuards(GithubGuard)
    githubAuthRedirect(@Req() req) {
        return this.oauthService.githubLogin(req);
    }
}
