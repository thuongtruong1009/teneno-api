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
} from './dto/comment';
import {
  ICreatePost,
  IGetAllPostsOfUser,
  IGetAllPublicPosts,
} from './dto/post/response';

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
  @ApiOperation({ summary: 'Get all posts of user by user-id (all)' })
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
    summary: 'Get all public and private posts of user (user)',
  })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPostsOfUser(
    @GetCurrentUserId() userId: string,
  ): Promise<IGetAllPostsOfUser[]> | null {
    return this.postsService.getAllPostsOfUser(userId);
  }

  @Get(':userId/all')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all public posts of user by user-id (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async getAllPublicPosts(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<IGetAllPublicPosts[]> | null {
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

  @Post('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new comment to post of user (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async addComment(@Body() dto: CreateCommentDto) {
    return this.postsService.addComment(dto);
  }

  @Put('comments/update/text')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment in post (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async updateComment(@Body() dto: UpdateCommentTextDto) {
    return this.postsService.updateComment(dto);
  }

  @Delete('comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a comment in post (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  async deleteComment(@Body() dto: DeleteCommentDto) {
    return this.postsService.deleteComment(dto);
  }
}
