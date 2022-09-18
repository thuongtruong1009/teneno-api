import {
    BadRequestException,
    CACHE_MANAGER,
    ConflictException,
    ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';
import { IFailRecaptcha, ISuccessRecaptcha, ITokens } from './dto/response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
    LoginDto,
    RecaptchaDto,
    SignupDto,
    UpdatePasswordDto,
} from './dto/request';
import { Cache } from 'cache-manager';
import { AUTH_ERROR, SYSTEM_ERROR, USER_ERROR } from 'src/core/constants';
import { comparePassword, hashPassword } from 'src/core/helpers';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        @Inject(ConfigService)
        private configService: ConfigService,
        private prismaService: PrismaService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getTokens(
        userId: string,
        email: string,
        roles: string[],
    ): Promise<ITokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email: email,
                    roles: roles,
                },
                {
                    secret: this.configService.get<string>('APP_SECRET'),
                    expiresIn: this.configService.get<string>('EXPIRE_AT_TIME'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email: email,
                    roles: roles,
                },
                {
                    secret: this.configService.get<string>('APP_SECRET'),
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

        if (userExist.length > 0)
            throw new ConflictException(USER_ERROR.DUPLICATE);

        const newUser = await this.prismaService.user.create({
            data: {
                email: dto.email,
                password: hash,
                username: dto.username,
            },
        });

        const tokens = await this.getTokens(
            newUser.id,
            newUser.email,
            newUser.role,
        );
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

        const passwordMatches = await comparePassword(
            dto.password,
            user.password,
        );
        if (!passwordMatches)
            throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refreshToken);
        await this.cacheManager.set('cacheToken', tokens);
        return tokens;
    }

    async verifyRecaptcha(
        recaptcha: any,
    ): Promise<ISuccessRecaptcha | IFailRecaptcha> {
        const bodyFormData: FormData = new FormData();
        bodyFormData.append(
            'secret',
            this.configService.get('GOOGLE_RECAPTCHA_SECRET'),
        );
        bodyFormData.append('response', recaptcha);

        const result = await axios.post(
            `${this.configService.get('RECAPTCHA_VERIFY_URL')}`,
            bodyFormData,
        );

        //     const response = await axiosRequest('post',
        //       `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${capcha}`,
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     );
        if (!result?.data.success) throw new Error(AUTH_ERROR.RECAPTCHA_FAILED);
        if (result?.data.score < 0.5) {
            throw new BadRequestException(AUTH_ERROR.RECAPTCHA_NOT_PERSON);
        }
        return result?.data;
    }

    async signInRecaptcha(dto: RecaptchaDto): Promise<ITokens> {
        await this.verifyRecaptcha(dto.recaptcha);
        const { email, password } = dto;
        return await this.signinLocal({ email, password });
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

        const tokens = await this.getTokens(user.id, user.email, user.role);
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

        if (!passwordMatches)
            throw new ForbiddenException(SYSTEM_ERROR.FORBIDDEN);

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

        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }
}
