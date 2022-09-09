import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { config } from 'dotenv';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OauthService } from '../oauth.service';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private oauthService: OauthService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ['public_profile'],
        });
    }

    async validate(
        accessToken: string,
        _refreshToken: string,
        profile: Profile,
    ) {
        return 'Login with Github';
    }
}
