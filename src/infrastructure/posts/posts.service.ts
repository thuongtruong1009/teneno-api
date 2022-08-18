import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v4 as uuid } from 'uuid';
import { GetPostByUserIdDto } from './dto';

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

  async getOnePostById(postId: string) {
    return await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  update(id: string, dto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
