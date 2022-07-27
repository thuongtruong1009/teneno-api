import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ITokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from 'src/helpers/hash';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService)
    private configService: ConfigService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string): Promise<ITokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get('at-secret'),
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get('rt-secret'),
          expiresIn: '7d',
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  async updateRtHash(userId: number, rt: string) {
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

  async signupLocal(dto: AuthDto): Promise<ITokens> {
    const hash = await hashPassword(dto.password);

    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signinLocal(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await comparePassword(dto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
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

  async refreshToken(userId: number, refreshToken: string) {
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
}
