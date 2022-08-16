import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ITokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from 'src/core/helpers/hash';
import { LoginDto, SignupDto } from './dto/';
import { v4 as uuid } from 'uuid';

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
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
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

    const newUser = await this.prismaService.user.create({
      data: {
        id: uuid(),
        email: dto.email,
        password: hash,
        username: dto.username,
        profile: {
          create: {
            fullName: '',
            birthdate: new Date(),
            avatar: '',
            cover: '',
            marriageStatus: '',
            interests: [],
            bio: '',
            address: '',
            phone: '',
            age: 0,
            gender: 0,
          },
        },
        role: ['USER'],
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signinLocal(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await comparePassword(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
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

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access denied');

    const hashMatches = await comparePassword(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!hashMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async updatePassWord(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // const passwordMatches = await comparePassword(dto.password, user.password);
    // if (!passwordMatches) throw new ForbiddenException('Access denied');

    // if (passwordMatches) {
    //   await this.prismaService.user.update({
    //     where: { email: dto.email },
    //     data: {
    //       password: dto.password,
    //   });
    // }

    await this.prismaService.user.update({
      where: { email: dto.email },
      data: {
        password: await hashPassword(dto.password),
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
