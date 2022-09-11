import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { axiosRequest } from 'src/core/helpers';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from '../auth/dto/request';

@Injectable()
export class OauthService {
    constructor(private readonly authService: AuthService) {}

    async googleLogin(req: any) {
        if (!req.user) {
            return 'Not found user from google';
        }

        const payload = {
            email: req.user.email,
            password: req.user.email,
            username: req.user.email,
        } as SignupDto;

        await this.authService.signupLocal(payload);

        return await this.authService.signinLocal(payload);
    }

    async githubRedirect(req: string) {
        // client must request to this url https://github.com/login/oauth/authorize?client_id=358d96685bac18841a23&scope=user:email
        if (!req) {
            return 'Not found user from github';
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
            password: data.id.toString(),
            username: data.login,
        } as SignupDto;
        await this.authService.signupLocal(payload);
        return await this.authService.signinLocal(payload);
    }
}
