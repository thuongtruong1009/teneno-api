import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthModule } from '../auth/auth.module';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
    imports: [AuthModule],
    controllers: [OauthController],
    providers: [OauthService, GoogleStrategy, FacebookStrategy],
    exports: [OauthService],
})
export class OauthModule {}
