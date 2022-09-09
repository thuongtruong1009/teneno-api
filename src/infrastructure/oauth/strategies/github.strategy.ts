import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/infrastructure/users/users.service';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private usersService: UsersService) {
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
        return profile;
    }
}
