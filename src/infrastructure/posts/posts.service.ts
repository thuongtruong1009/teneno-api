import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async createPost(dto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: {
        id: uuid(),
        description: dto.description,
        files: dto.files,
        userId: dto.userId,
        categories: {
          create: [
            {
              createAt: new Date(),
              category: {
                create: {
                  id: uuid(),
                  name: 'New category',
                },
              },
            },
          ],
        },
      },
    });
    return post;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string, dto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
