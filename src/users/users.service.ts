import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from './dto';
import { IUserProfile } from './type/user-profile';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async updateUsersProfile(dto: UserProfileDto) {
    return dto;
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
    try {
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
    } catch (error) {
      throw new Error(`Error when find user by id: ${error.message} `);
    }
  }
}
