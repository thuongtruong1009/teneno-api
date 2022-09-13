import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../abstraction/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService) {}
}
