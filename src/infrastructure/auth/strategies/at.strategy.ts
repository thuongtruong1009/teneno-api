import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../dto/response';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secretOrKey: config.get<string>('APP_SECRET'),
            secretOrKey: process.env.APP_SECRET,
            ignoreExpiration: false,
            passReqToCallback: false,
        });
    }

    validate(payload: IJwtPayload): IJwtPayload {
        return payload;
    }
}
