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
    return await this.prismaService.user.findMany();
  }

  async getUsersById(userId: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: Number(userId) },
        select: {
          id: true,
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
