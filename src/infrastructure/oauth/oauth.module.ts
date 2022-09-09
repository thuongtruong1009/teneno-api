import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [OauthController],
    providers: [OauthService, GoogleStrategy],
})
export class OauthModule {}
