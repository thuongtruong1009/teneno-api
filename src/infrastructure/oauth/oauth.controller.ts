import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators';
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
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Req() req: any) {
        return req;
    }

    @Get('github/redirect')
    @UseGuards(AuthGuard('github'))
    githubAuthRedirect(@Req() req: any) {
        return this.oauthService.githubLogin(req);
    }
}
