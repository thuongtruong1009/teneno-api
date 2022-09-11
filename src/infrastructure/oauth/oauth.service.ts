import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from '../auth/auth.service';
import { SignupDto } from '../auth/dto/request';

@Injectable()
export class OauthService {
    constructor(private readonly authService: AuthService) {}

    googleLogin(req: any) {
        if (!req.user) {
            return 'Not found user from google';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }

    // {"data":{"message":"User information from google","user":{"email":"testershopee9@gmail.com","firstName":"Commerce","lastName":"Shopee","picture":"https://lh3.googleusercontent.com/a/AItbvmnEB57ZObrQvXfgLIjSVy0EBphcmbFSqAfgqPNN=s96-c","accessToken":"ya29.A0AVA9y1saRvWMVS4qatf0XfNnWghlqrkgOsvWQlhC4bWoZR4dGR2C6XckC-NTg-P8ySbSEsJ1G23UsPZzNNZ1eLpKykZLRnel2Sv1c8SbMZc6wKPyIlNzVyb2I7Lsi5qISqM2rA608q1uwI3nQLa6xZMT_MbGaCgYKATASATASFQE65dr8salWp_aAxzkflweuaHgpGA0163"}}}

    async githubRedirect(req: string) {
        // client must request to this url https://github.com/login/oauth/authorize?client_id=358d96685bac18841a23&scope=user:email
        if (!req) {
            return 'Not found user from github';
        }

        const requestToken = req['code'];

        return await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${requestToken}`,
            headers: {
                accept: 'application/json',
            },
        }).then(async (response) => {
            return await this.githubSuccess(response.data.access_token);
        });
    }

    async githubSuccess(token: string) {
        await axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
                Authorization: 'token ' + token,
            },
        }).then(async (response) => {
            // console.log({ data: response.data });
            const payload = {
                email: (response.data.email ||
                    `${response.data.login}@gmail.com`) as string,
                password: response.data.id.toString() as string,
                username: response.data.login as string,
            } as SignupDto;
            await this.authService.signupLocal(payload);
            return await this.authService.signinLocal(payload);
        });
    }
}
