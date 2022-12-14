import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../dto/response';
import { ESTRATEGY } from 'src/core/constants';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, ESTRATEGY.JWT) {
    constructor(@Inject(ConfigService) private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('APP_SECRET'),
            // secretOrKey: process.env.APP_SECRET,
            ignoreExpiration: false,
            passReqToCallback: false,
        });
    }

    async validate(payload: IJwtPayload): Promise<IJwtPayload> {
        return payload;
    }
}
