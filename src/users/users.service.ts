import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateUsersProfile(userId: string, dto: UserProfileDto) {
    await this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        profile: {
          update: {
            ...dto,
          },
        },
      },
    });
    const newProfile = await this.getUsersById(userId);
    return newProfile;
  }

  async getAllUsers() {
    const user = await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const total = user.length;
    return { total, user };
  }

  async getUsersById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
