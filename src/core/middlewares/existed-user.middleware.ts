import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';

@Injectable()
export class ExistedUserMiddleware implements NestMiddleware {
    constructor(private prismaService: PrismaService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const userExist = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
            },
        });
        if (
            userExist === null ||
            userExist === undefined ||
            userExist.id === ''
        ) {
            throw new NotFoundException('User not found');
        }
        next();
    }
}
