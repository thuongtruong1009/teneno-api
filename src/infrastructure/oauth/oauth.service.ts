import { Injectable } from '@nestjs/common';

@Injectable()
export class OauthService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}

// {"data":{"message":"User information from google","user":{"email":"testershopee9@gmail.com","firstName":"Commerce","lastName":"Shopee","picture":"https://lh3.googleusercontent.com/a/AItbvmnEB57ZObrQvXfgLIjSVy0EBphcmbFSqAfgqPNN=s96-c","accessToken":"ya29.A0AVA9y1saRvWMVS4qatf0XfNnWghlqrkgOsvWQlhC4bWoZR4dGR2C6XckC-NTg-P8ySbSEsJ1G23UsPZzNNZ1eLpKykZLRnel2Sv1c8SbMZc6wKPyIlNzVyb2I7Lsi5qISqM2rA608q1uwI3nQLa6xZMT_MbGaCgYKATASATASFQE65dr8salWp_aAxzkflweuaHgpGA0163"}}}
