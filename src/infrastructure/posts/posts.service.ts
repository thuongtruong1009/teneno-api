import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { CreatePostDto, GetPostByUserIdDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async createPost(dto: CreatePostDto) {
    const findUser = await this.prismaService.user.findUnique({
      where: {
        id: dto.authorId,
      },
    });
    if (!findUser) {
      return new NotFoundException('User not found');
    }
    const post = await this.prismaService.post.create({
      data: {
        id: uuid(),
        title: dto.title,
        description: dto.description,
        files: dto.files,
        authorId: dto.authorId,
        // categories: {
        //   create: [
        //     {
        //       createAt: new Date(),
        //       category: {
        //         create: {
        //           id: uuid(),
        //           name: 'New category',
        //         },
        //       },
        //     },
        //   ],
        // },
      },
    });
    return post;
  }

  async getAllPostsOfUser(userId: string) {
    return await this.prismaService.user.findMany({
      where: {
        id: userId,
      },
      select: {
        writtenPosts: true,
      },
    });
  }

  async getOnePostById(postId: string) {
    return await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  async updatePost(dto: UpdatePostDto) {
    console.log(dto);
    const identify = await this.prismaService.user.update({
      where: {
        id: dto.authorId,
      },
      data: [
        {
          writtenPosts: {
            update: {
              title: dto.title,
              description: dto.description,
              files: dto.files,
            },
            where: {
              id: dto.postId,
            },
          },
        },
      ],
    });
    return identify;
  }

  deletePost(id: string) {
    return `This action removes a #${id} post`;
  }

  deleteOnePostById(id: string) {
    return `This action removes a #${id} post`;
  }
  deleteManyPostById(id: string) {
    return `This action removes a #${id} post`;
  }
}
