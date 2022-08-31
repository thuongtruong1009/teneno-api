import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAdminDto } from './dto/request/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  update(userId: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${userId} admin`;
  }
}
