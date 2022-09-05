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
  ReactionsPost,
  UpdatePostDto,
} from './dto/post/request';
import {
  CreateCommentDto,
  DeleteCommentDto,
  UpdateCommentTextDto,
} from './dto/comment/request';
import {
  ICreatePost,
  IGetPostOfUser,
  IGetPublicPost,
  IUpdatePost,
  IUpdateReaction,
} from './dto/post/response';
import {
  ICreateComment,
  IGetComment,
  IUpdateComment,
} from './dto/comment/response';
import {
  POST_ERROR,
  RESPONSES_MESSAGE,
  USER_ERROR,
} from 'src/core/constants/status-message';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async createPost(userId: string, dto: CreatePostDto): Promise<ICreatePost> {
    const post = await this.prismaService.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        files: dto.files,
        authorId: userId,
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
      select: {
        id: true,
        title: true,
        description: true,
        files: true,
        published: true,
        authorId: true,
        createdAt: true,
      },
    });
    return post;
  }

  async getAllPostsOfUser(userId: string): Promise<IGetPostOfUser[]> | null {
    return await this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        files: true,
        published: true,
        authorId: true,
        createdAt: true,
        reactions: true,
      },
    });
  }

  async getAllPublicPosts(userId: string): Promise<IGetPublicPost[]> | null {
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
      throw new NotFoundException(USER_ERROR.NOT_FOUND);
    }
    if (list.length === 0) {
      throw new NotFoundException(POST_ERROR.EMPTY);
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

  async getOnePostById(postId: string): Promise<IGetPostOfUser> {
    return await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        files: true,
        authorId: true,
        createdAt: true,
        reactions: true,
      },
    });
  }

  async updatePost(dto: UpdatePostDto): Promise<IUpdatePost> {
    const list = await this.getOnePostById(dto.postId);

    if (!list) {
      throw new NotFoundException(POST_ERROR.NOT_FOUND);
    }

    if (list.authorId !== dto.authorId) {
      throw new ForbiddenException(POST_ERROR.NOT_AUTHOR);
    }

    return await this.prismaService.post.update({
      where: {
        id: dto.postId,
      },
      data: {
        title: dto.title,
        description: dto.description,
        files: dto.files,
        published: dto.published,
      },
      select: {
        title: true,
        description: true,
        published: true,
        files: true,
        updatedAt: true,
      },
    });
  }

  async deletePost(userId: string, dto: DeleteOnePost): Promise<string> {
    const identify = await this.prismaService.post.findUnique({
      where: {
        id: dto.postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!identify) {
      throw new NotFoundException(POST_ERROR.NOT_FOUND);
    }

    if (identify.authorId !== userId) {
      throw new ForbiddenException(POST_ERROR.NOT_AUTHOR);
    }

    await this.prismaService.post.delete({
      where: {
        id: dto.postId,
      },
    });
    return 'This post has been deleted!';
  }

  async reactionPost(dto: ReactionsPost): Promise<IUpdateReaction> {
    const checkExist = await this.prismaService.reaction.findMany({
      where: {
        postId: dto.postId,
        userId: dto.favouritorId,
      },
    });

    if (checkExist.length > 0) {
      throw new BadRequestException('You already reacted to this post');
    }
    await this.prismaService.reaction.create({
      data: {
        userId: dto.favouritorId,
        postId: dto.postId,
        type: dto.reactionType,
      },
    });
    return await this.prismaService.post.findUnique({
      where: {
        id: dto.postId,
      },
      select: {
        reactions: true,
      },
    });
  }

  async getAllComments(postId: string): Promise<IGetComment> {
    return await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        comments: true,
      },
    });
  }

  async addComment(
    userId: string,
    dto: CreateCommentDto,
  ): Promise<ICreateComment> {
    const checkPost = await this.prismaService.post.findUnique({
      where: {
        id: dto.postId,
      },
    });

    if (!checkPost) {
      throw new NotFoundException(POST_ERROR.NOT_FOUND);
    }
    return this.prismaService.comment.create({
      data: {
        text: dto.text,
        postId: dto.postId,
        authorId: userId,
      },
    });
  }

  async updateComment(dto: UpdateCommentTextDto): Promise<IUpdateComment> {
    return await this.prismaService.comment.update({
      where: {
        id: dto.id,
      },
      data: {
        text: dto.text,
      },
      select: {
        text: true,
        updatedAt: true,
      },
    });
  }

  async deleteComment(dto: DeleteCommentDto): Promise<string> {
    await this.prismaService.comment.delete({
      where: {
        id: dto.id,
      },
    });
    return RESPONSES_MESSAGE.DELETE_COMMENT;
  }
}
