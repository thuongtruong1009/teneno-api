import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from 'src/infrastructure/auth/dto';
import { comparePassword } from 'src/core/helpers/hash';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import {
  GetUserProfileByEmailNameDto,
  PaginationDto,
  UserAvatarDto,
  UserCoverDto,
  UserProfileDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(dto: PaginationDto) {
    const total = await this.prismaService.user.count();
    const user = await this.prismaService.user.findMany({
      skip: Number(dto.limit) * (Number(dto.current) - 1),
      take: Number(dto.limit),
      orderBy: {
        id: dto.order as any,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      total,
      orderBy: dto.order,
      pageItems: user.length,
      pageLimit: Number(dto.limit),
      pageCurrent: Number(dto.current),
      users: user,
    };
  }

  async getUsersById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
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

  async getUsersByEmailAndName(dto: GetUserProfileByEmailNameDto) {
    const user = await this.prismaService.user.findMany({
      where: {
        AND: [
          {
            email: dto.email,
            username: dto.username,
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async updateUsersProfile(userId: string, dto: UserProfileDto) {
    await this.prismaService.user.update({
      where: { id: userId },
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

  async updateUsersAvatar(userId: string, dto: UserAvatarDto) {
    await this.prismaService.user.update({
      where: { id: userId },
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

  async updateUsersCover(userId: string, dto: UserCoverDto) {
    await this.prismaService.user.update({
      where: { id: userId },
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

  async deleteUserByEmail(userId: string, dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const matchPassword = await comparePassword(dto.password, user.password);

    if (!matchPassword) throw new ForbiddenException('Access denied');

    await this.prismaService.userProfile.delete({
      where: {
        userId: userId,
      },
    });
    return matchPassword;
  }

  async deleteUserById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('Access denied');

    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
