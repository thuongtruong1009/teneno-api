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
  createPost(@Body() dto: CreatePostDto) {
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
  getAllPostsOfUser(@Body() dto: GetAllPostOfUserDto) {
    return this.postsService.getAllPostsOfUser(dto);
  }

  @Get(':userId/all')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all public posts of user by user-id (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  getAllPublicPosts(@Param('userId') userId: string) {
    return this.postsService.getAllPublicPosts(userId);
  }

  @Get(':postId')
  @Public()
  @ApiOperation({ summary: 'Get one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  getOnePostById(@Param('postId') postId: string) {
    return this.postsService.getOnePostById(postId);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  updatePost(@Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(dto);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one post of user (all)' })
  @ApiOkResponse({
    description: 'Success',
  })
  deletePost(@Body() dto: DeleteOnePost) {
    return this.postsService.deletePost(dto);
  }

  @Post('reaction')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'React to posts of user (user)' })
  @ApiOkResponse({
    description: 'Success',
  })
  reactionPost(@Body() dto: ReactionsPost) {
    return this.postsService.reactionPost(dto);
  }
}
