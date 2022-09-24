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
import { STATUS_MESSAGE, SYSTEM_ERROR } from 'src/core/constants';

@ApiTags('Posts')
@ApiUnauthorizedResponse({ description: SYSTEM_ERROR.UNAUTHORIZED })
@ApiForbiddenResponse({ description: SYSTEM_ERROR.FORBIDDEN })
@ApiNotFoundResponse({
    description: SYSTEM_ERROR.NOT_FOUND,
    type: Error,
})
@ApiMethodNotAllowedResponse({ description: SYSTEM_ERROR.METHOD_NOT_ALLOWED })
@ApiNotAcceptableResponse({
    description: SYSTEM_ERROR.NOT_ACCEPTABLE,
})
@ApiRequestTimeoutResponse({ description: SYSTEM_ERROR.REQUEST_TIMEOUT })
@ApiConflictResponse({
    description: SYSTEM_ERROR.CONFLICT,
})
@ApiPayloadTooLargeResponse({ description: SYSTEM_ERROR.PAYLOAD_TOO_LARGE })
@ApiUnsupportedMediaTypeResponse({
    description: SYSTEM_ERROR.UNSUPPORTED_MEDIA_TYPE,
})
@ApiTooManyRequestsResponse({ description: SYSTEM_ERROR.TOO_MANY_REQUESTS })
@ApiInternalServerErrorResponse({
    description: SYSTEM_ERROR.INTERNAL_SERVER_ERROR,
})
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new post by user-id' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
    })
    async getAllPostsOfUser(@GetCurrentUserId() userId: string) {
        return this.postsService.getAllPostsOfUser(userId);
    }

    @Get(':userId/all')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all public posts of user by user-id' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
    })
    async updatePost(@Body() dto: UpdatePostDto): Promise<IUpdatePost> {
        return this.postsService.updatePost(dto);
    }

    @Delete('delete')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete one post of user' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
    })
    async deletePost(
        @GetCurrentUserId() userId: string,
        @Body() dto: DeleteOnePost,
    ): Promise<string> {
        return this.postsService.deletePost(userId, dto);
    }

    @Post('reactions/all')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all reactions of post' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
    })
    async getAllReactionsPost(
        @GetCurrentUserId() userId: string,
        @Body() dto: any,
    ) {
        return this.postsService.getAllReactionsPost(userId, dto.postId);
    }

    @Post('reaction/new')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'React to post of user' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
    })
    async createReactionToPost(
        @GetCurrentUserId() userId: string,
        @Body() dto: ReactionsPost,
    ): Promise<IUpdateReaction> {
        return this.postsService.createReactionToPost(userId, dto);
    }

    @Public()
    @Get(':postId/comments')
    @ApiOperation({ summary: 'Get all comments of the post' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
    })
    async getAllComments(
        @Param('postId', new ParseUUIDPipe()) postId: string,
    ): Promise<IGetComment> {
        return this.postsService.getAllComments(postId);
    }

    @Post('comments')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new comment to post of user' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
    })
    async deleteComment(@Body() dto: DeleteCommentDto): Promise<string> {
        return this.postsService.deleteComment(dto);
    }
}
