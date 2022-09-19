import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ESTRATEGY } from 'src/core/constants';

@Injectable()
export class RtStrategy extends PassportStrategy(
    Strategy,
    ESTRATEGY.JWT_REFRESH,
) {
    constructor(
        @Inject(ConfigService)
        private config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('APP_SECRET'),
            // secretOrKey: process.env.APP_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req
            .get('authorization')
            .replace('Bearer', '')
            .trim();
        return {
            ...payload,
            refreshToken,
        };
    }
}
