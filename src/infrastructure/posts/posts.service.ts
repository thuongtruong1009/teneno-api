import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreatePostDto,
  DeleteOnePost,
  GetAllPostOfUserDto,
  ReactionsPost,
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

  async getAllPostsOfUser(dto: GetAllPostOfUserDto) {
    const list = await this.prismaService.user.findMany({
      where: {
        id: dto.userId,
      },
      select: {
        writtenPosts: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!list) {
      return new NotFoundException('User not found');
    }
    if (list.length === 0) {
      return new NotFoundException('User not have post!');
    }
    return await this.prismaService.post.findMany({
      where: {
        authorId: dto.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        files: true,
        authorId: true,
        createdAt: true,
        reactions: true,
      },
    });
  }

  async getAllPublicPosts(userId: string) {
    const list = await this.prismaService.user.findMany({
      where: {
        id: userId,
      },
      select: {
        writtenPosts: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!list) {
      return new NotFoundException('User not found');
    }
    if (list.length === 0) {
      return new NotFoundException('User not have post!');
    }
    return await this.prismaService.post.findMany({
      where: {
        authorId: userId,
        published: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        files: true,
        authorId: true,
        createdAt: true,
        reactions: true,
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
    const list = await this.getOnePostById(dto.postId);

    if (!list) {
      return new NotFoundException('Post not found');
    }

    if (list.authorId !== dto.authorId) {
      return new ForbiddenException('You are not author of this post');
    }

    return await this.prismaService.post.update({
      where: {
        id: dto.postId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        files: dto.files,
      },
    });
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

  async reactionPost(dto: ReactionsPost) {
    const checkExist = await this.prismaService.reaction.findMany({
      where: {
        postId: dto.postId,
        userId: dto.favouritorId,
      },
    });

    if (checkExist.length > 0) {
      return new BadRequestException('You already reacted to this post');
    }
    return this.prismaService.reaction.create({
      data: {
        userId: dto.favouritorId,
        postId: dto.postId,
        type: dto.reactionType,
      },
    });
  }
}
