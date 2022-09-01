import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { AdminUsersController } from './admin-users.controller';

@Module({
  imports: [UsersModule],
  controllers: [AdminController, AdminUsersController],
  providers: [AdminService],
})
export class AdminModule {}
