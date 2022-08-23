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
import { DeleteOnePost, GetPostByUserIdDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROLE, RoleDecorator } from 'src/core/roles';

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

  @Delete('delete')
  @Public()
  deletePost(@Body() dto: DeleteOnePost) {
    return this.postsService.deletePost(dto);
  }
}
