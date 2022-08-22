import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from '../auth/common/decorators';
import { GetPostByUserIdDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @Public()
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Get(':userId/all')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all posts of user by user-id (all)' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  getAllPostsOfUser(@Param('userId') userId: string) {
    return this.postsService.getAllPostsOfUser(userId);
  }

  @Get(':postId')
  @Public()
  getOnePostById(@Param('postId') postId: string) {
    return this.postsService.getOnePostById(postId);
  }

  @Patch('update')
  updatePost(@Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(dto);
  }

  @Delete()
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Delete(':id')
  deleteOnePostById(@Param('id') id: string) {
    return this.postsService.deleteOnePostById(id);
  }

  @Delete(':id')
  deleteManyPostById(@Param('id') id: string) {
    return this.postsService.deleteManyPostById(id);
  }
}
