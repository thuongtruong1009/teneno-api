import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ITokens } from './dto/response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from 'src/core/helpers/hash';
import { LoginDto, SignupDto, UpdatePasswordDto } from './dto/request';
import {
  AUTH_ERROR,
  SYSTEM_ERROR,
  USER_ERROR,
} from 'src/core/constants/status-message';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, email: string): Promise<ITokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('EXPIRE_AT_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('EXPIRE_RT_TIME'),
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await hashPassword(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }

  async signupLocal(dto: SignupDto): Promise<ITokens> {
    const hash = await hashPassword(dto.password);

    const userExist = await this.prismaService.user.findMany({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (userExist.length > 0) throw new ConflictException(USER_ERROR.DUPLICATE);

    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: hash,
        username: dto.username,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signinLocal(dto: LoginDto): Promise<ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    const passwordMatches = await comparePassword(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: { hashedRefreshToken: null },
    });
  }

  async refreshToken(userId: string, refreshToken: string): Promise<ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    const hashMatches = await comparePassword(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!hashMatches) throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async updatePassWord(dto: UpdatePasswordDto): Promise<ITokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const passwordMatches = await comparePassword(
      dto.oldPassword,
      user.password,
    );

    if (!passwordMatches) throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

    if (dto.newPassword === dto.oldPassword)
      throw new ForbiddenException(AUTH_ERROR.SAME_PASSWORD);

    if (passwordMatches) {
      await this.prismaService.user.update({
        where: { email: dto.email },
        data: {
          password: await hashPassword(dto.newPassword),
        },
      });
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
