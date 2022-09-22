import { Injectable, NotFoundException } from '@nestjs/common';
import { axiosRequest } from 'src/core/helpers';
import { subRandom } from 'src/core/utils/random';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from '../auth/dto/request';
import { UsersService } from '../users/users.service';

@Injectable()
export class OauthService {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    async facebookRedirect(req: any) {
        if (!req.user) {
            return 'Not found user from facebook!';
        }

        const payload = {
            email: req.user.user.email,
            password: req.user.user.email.split('@')[0],
            username: subRandom(16),
        } as SignupDto;

        const identify = await this.usersService.getUserByEmail(payload.email);
        if (!identify) {
            return await this.authService.signupLocal(payload);
        }
        return await this.authService.signinLocal(payload);
    }

    async googleRedirect(req: any) {
        if (!req.user) {
            return 'Not found user from Google!';
        }

        const payload = {
            email: req.user.email,
            password: req.user.email.split('@')[0],
            username: subRandom(16),
        } as SignupDto;

        const identify = await this.usersService.getUserByEmail(payload.email);
        if (!identify) {
            return await this.authService.signupLocal(payload);
        }
        return await this.authService.signinLocal(payload);
    }

    async githubRedirect(req: string) {
        // client must request to this url https://github.com/login/oauth/authorize?client_id=358d96685bac18841a23&scope=user:email
        if (!req) {
            return 'Not found user from Github!';
        }

        const requestToken = req['code'];

        const data = await axiosRequest(
            'post',
            `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${requestToken}`,
            { accept: 'application/json' },
        );
        return await this.githubSuccess(data.access_token);
    }

    async githubSuccess(token: string) {
        const data = await axiosRequest('get', 'https://api.github.com/user', {
            Authorization: 'token ' + token,
        });
        const payload = {
            email: data.email || `${data.login}@gmail.com`,
            password: data.email.split('@')[0],
            username: subRandom(16),
        } as SignupDto;

        if (!payload.email) {
            throw new NotFoundException(
                'The email address associated with this account has not been verified or made public!',
            );
        }

        const identify = await this.usersService.getUserByEmail(payload.email);
        if (!identify) {
            return await this.authService.signupLocal(payload);
        }
        return await this.authService.signinLocal(payload);
    }
}
