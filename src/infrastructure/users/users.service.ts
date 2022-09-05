import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from 'src/infrastructure/auth/dto/request';
import { comparePassword } from 'src/core/helpers/hash';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import {
  UpdateUserAvatarDto,
  UpdateUserCoverDto,
  UpdateUserProfileDto,
} from './dto/request';
import {
  IAllUsers,
  IFindUserByEmail,
  IGetUserProfile,
  IPublicUser,
  IUpdateAvatar,
  IUpdateCover,
} from './dto/response';
import { PaginationDto } from 'src/core/common/pagination.dto';
import {
  AUTH_ERROR,
  RESPONSES_MESSAGE,
  SYSTEM_ERROR,
  USER_ERROR,
} from 'src/core/constants/status-message';

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
    if (identify.length === 0)
      throw new NotFoundException(USER_ERROR.NOT_FOUND);
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

    if (!identify) throw new NotFoundException(USER_ERROR.NOT_FOUND);
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

    if (!profile) throw new NotFoundException(USER_ERROR.NOT_FOUND);
    return profile;
  }

  async updateUsersProfile(
    userId: string,
    dto: UpdateUserProfileDto,
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
    dto: UpdateUserAvatarDto,
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
    dto: UpdateUserCoverDto,
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

    if (!user) throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    const matchEmail: number = dto.password.localeCompare(user.password);
    const matchPassword: boolean = await comparePassword(
      dto.password,
      user.password,
    );

    if (matchEmail === 0 || !matchPassword)
      throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    if (!matchPassword)
      throw new NotAcceptableException(AUTH_ERROR.PASSWORD_NOT_MATCH);

    await this.prismaService.userProfile.delete({
      where: {
        userId: userId,
      },
    });
    return RESPONSES_MESSAGE.DELETE_USER;
  }

  async deleteUserById(userId: string): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(USER_ERROR.NOT_FOUND);

    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
    return RESPONSES_MESSAGE.DELETE_USER;
  }
}
