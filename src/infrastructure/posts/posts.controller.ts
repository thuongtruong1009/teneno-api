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
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Public } from '../auth/decorators';
import {
  CreatePostDto,
  DeleteOnePost,
  UpdatePostDto,
  ReactionsPost,
  GetAllPostOfUserDto,
} from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/comment';

@ApiTags('Posts')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiNotAcceptableResponse({
  description: 'Provided inputs are not in correct form.',
})
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Get all posts of user by user-id (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiCreatedResponse({ description: 'Create new post successfuly' })
  async createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Post('private/all')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all public and private posts of user (user)',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPostsOfUser(@Body() dto: GetAllPostOfUserDto) {
    return this.postsService.getAllPostsOfUser(dto);
  }

  @Get(':userId/all')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all public posts of user by user-id (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPublicPosts(@Param('userId') userId: string) {
    return this.postsService.getAllPublicPosts(userId);
  }

  @Get(':postId')
  @Public()
  @ApiOperation({ summary: 'Get one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getOnePostById(@Param('postId', new ParseUUIDPipe()) postId: string) {
    return this.postsService.getOnePostById(postId);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async updatePost(@Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(dto);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async deletePost(@Body() dto: DeleteOnePost) {
    return this.postsService.deletePost(dto);
  }

  @Post('reaction')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'React to post of user (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async reactionPost(@Body() dto: ReactionsPost) {
    return this.postsService.reactionPost(dto);
  }

  @Public()
  @Get(':postId/comments')
  @ApiOperation({ summary: 'Get all comments of the post (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllComments(@Param('postId', new ParseUUIDPipe()) postId: string) {
    console.log(postId);
    return this.postsService.getAllComments(postId);
  }

  @Public()
  @Post('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new comment to post of user (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async addComment(@Body() dto: CreateCommentDto) {
    return this.postsService.addComment(dto);
  }

  @Public()
  @Patch('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment to post (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async updateComment(@Body() dto: string) {
    return this.postsService.updateComment(dto);
  }

  @Public()
  @Delete('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment to post (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async deleteComment(@Body() dto: string) {
    return this.postsService.deleteComment(dto);
  }
}
