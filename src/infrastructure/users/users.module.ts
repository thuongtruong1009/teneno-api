import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExistedUserMiddleware } from 'src/core/middlewares/existed-user.middleware';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  public configure(consumer: MiddlewareConsumer): void {
    // consumer
    //   .apply(ExistedUserMiddleware)
    //   .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
