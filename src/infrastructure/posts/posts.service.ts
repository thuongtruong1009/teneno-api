import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import {
  CreatePostDto,
  DeleteOnePost,
  GetPostByUserIdDto,
  UpdatePostDto,
} from './dto';

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

  async deletePost(dto: DeleteOnePost) {
    const list = await this.prismaService.user.findUnique({
      where: {
        id: dto.authorId,
      },
      select: {
        writtenPosts: {
          select: {
            id: true,
          },
        },
      },
    });
    const identify = list.writtenPosts.find((post) => post.id === dto.postId);
    if (!identify) {
      return new NotFoundException('Post not found');
    }

    await this.prismaService.post.delete({
      where: {
        id: dto.postId,
      },
    });
    return '';
  }
}
