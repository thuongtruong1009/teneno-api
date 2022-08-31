import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from 'src/infrastructure/auth/dto';
import { comparePassword } from 'src/core/helpers/hash';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import {
  PaginationDto,
  UserAvatarDto,
  UserCoverDto,
  UserProfileDto,
} from './dto';
import {
  IAllUsers,
  IFindUserByEmail,
  IGetUserProfile,
  IPublicUser,
  IUpdateAvatar,
  IUpdateCover,
} from './dto/response';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(dto: PaginationDto): Promise<IAllUsers> {
    const total = await this.prismaService.user.count();
    const users = await this.prismaService.user.findMany({
      // skip: Number(dto.limit) * (Number(dto.current) - 1),
      take: Number(dto.limit) || 10,
      orderBy: {
        id: dto.order as any,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    return {
      total,
      orderBy: dto.order || 'asc',
      pageItems: users.length,
      pageLimit: Number(dto.limit) || 10,
      pageCurrent: Number(dto.current) || 1,
      users: users,
    };
  }

  async getPublicUserByIdOrUsername(
    userIdOrUsername: string,
  ): Promise<IPublicUser> {
    const identify = await this.prismaService.user.findMany({
      where: {
        OR: [{ id: userIdOrUsername }, { username: userIdOrUsername }],
      },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
        createdAt: true,
      },
    });
    if (identify.length === 0) throw new NotFoundException('User not found');
    return identify[0];
  }

  async getUserByEmail(email: string): Promise<IFindUserByEmail> {
    const identify = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      select: {
        username: true,
        email: true,
      },
    });

    if (!identify) throw new NotFoundException('User not found');
    return identify;
  }

  async getUserProfile(userId: string): Promise<IGetUserProfile> {
    const profile = await this.prismaService.user.findUnique({
      where: {
        id: userId,
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

    if (!profile) throw new NotFoundException('User not found');
    return profile;
  }

  async updateUsersProfile(
    userId: string,
    dto: UserProfileDto,
  ): Promise<IPublicUser> {
    await this.prismaService.userProfile.upsert({
      where: {
        userId: userId,
      },
      create: {
        ...dto,
        userId: userId,
      },
      update: {
        ...dto,
      },
    });
    const newProfile = await this.getPublicUserByIdOrUsername(userId);
    return newProfile;
  }

  async updateUsersAvatar(
    userId: string,
    dto: UserAvatarDto,
  ): Promise<IUpdateAvatar> {
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
    const newAvatar = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profile: {
          select: {
            avatar: true,
          },
        },
      },
    });
    return newAvatar;
  }

  async updateUsersCover(
    userId: string,
    dto: UserCoverDto,
  ): Promise<IUpdateCover> {
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
    const newCover = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profile: {
          select: {
            cover: true,
          },
        },
      },
    });
    return newCover;
  }

  async deleteUser(userId: string, dto: LoginDto): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const matchEmail: number = dto.password.localeCompare(user.password);
    const matchPassword: boolean = await comparePassword(
      dto.password,
      user.password,
    );

    if (matchEmail === 0 || !matchPassword)
      throw new ForbiddenException('Access denied');

    if (!matchPassword) throw new NotAcceptableException('Password not match!');

    await this.prismaService.userProfile.delete({
      where: {
        userId: userId,
      },
    });
    return 'User deleted';
  }

  async deleteUserById(userId: string): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
    return 'User deleted';
  }
}
