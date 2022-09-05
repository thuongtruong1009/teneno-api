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
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetCurrentUserId, Public } from '../auth/decorators';
import {
  CreatePostDto,
  DeleteOnePost,
  UpdatePostDto,
  ReactionsPost,
} from './dto/post/request';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
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

@ApiTags('Posts')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({
  description: 'Not Found.',
  type: Error,
})
@ApiMethodNotAllowedResponse({ description: 'Method Not Allowed.' })
@ApiNotAcceptableResponse({
  description: 'Provided inputs are not in correct form.',
})
@ApiRequestTimeoutResponse({ description: 'Request Timeout.' })
@ApiConflictResponse({
  description: 'Conflict existed.',
})
@ApiPayloadTooLargeResponse({ description: 'Payload Too Large.' })
@ApiUnsupportedMediaTypeResponse({
  description: 'Unsupported Media Type.',
})
@ApiTooManyRequestsResponse({ description: 'Too Many Requests.' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Get all posts of user by user-id' })
  @ApiOkResponse({
    description: 'Success',
  })
  @ApiCreatedResponse({ description: 'Create new post successfuly' })
  async createPost(
    @GetCurrentUserId() userId: string,
    @Body() dto: CreatePostDto,
  ): Promise<ICreatePost> {
    return this.postsService.createPost(userId, dto);
  }

  @Post('private/all')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all public and private posts of user',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPostsOfUser(
    @GetCurrentUserId() userId: string,
  ): Promise<IGetPostOfUser[]> | null {
    return this.postsService.getAllPostsOfUser(userId);
  }

  @Get(':userId/all')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all public posts of user by user-id' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPublicPosts(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<IGetPublicPost[]> | null {
    return this.postsService.getAllPublicPosts(userId);
  }

  @Get(':postId')
  @Public()
  @ApiOperation({ summary: 'Get one post of user' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getOnePostById(
    @Param('postId', new ParseUUIDPipe()) postId: string,
  ): Promise<IGetPostOfUser> {
    return this.postsService.getOnePostById(postId);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one post of user' })
  @ApiOkResponse({
    description: 'Success',
  })
  async updatePost(@Body() dto: UpdatePostDto): Promise<IUpdatePost> {
    return this.postsService.updatePost(dto);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one post of user' })
  @ApiOkResponse({
    description: 'Success',
  })
  async deletePost(
    @GetCurrentUserId() userId: string,
    @Body() dto: DeleteOnePost,
  ): Promise<string> {
    return this.postsService.deletePost(userId, dto);
  }

  @Post('reaction')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'React to post of user' })
  @ApiOkResponse({
    description: 'Success',
  })
  async reactionPost(@Body() dto: ReactionsPost): Promise<IUpdateReaction> {
    return this.postsService.reactionPost(dto);
  }

  @Public()
  @Get(':postId/comments')
  @ApiOperation({ summary: 'Get all comments of the post' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllComments(
    @Param('postId', new ParseUUIDPipe()) postId: string,
  ): Promise<IGetComment> {
    console.log(postId);
    return this.postsService.getAllComments(postId);
  }

  @Post('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new comment to post of user' })
  @ApiOkResponse({
    description: 'Success',
  })
  async addComment(
    @GetCurrentUserId() userId: string,
    @Body() dto: CreateCommentDto,
  ): Promise<ICreateComment> {
    return this.postsService.addComment(userId, dto);
  }

  @Put('comments/update/text')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment in post' })
  @ApiOkResponse({
    description: 'Success',
  })
  async updateComment(
    @Body() dto: UpdateCommentTextDto,
  ): Promise<IUpdateComment> {
    return this.postsService.updateComment(dto);
  }

  @Delete('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment in post' })
  @ApiOkResponse({
    description: 'Success',
  })
  async deleteComment(@Body() dto: DeleteCommentDto): Promise<string> {
    return this.postsService.deleteComment(dto);
  }
}
