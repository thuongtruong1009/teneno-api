import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UploadedFiles,
} from '@nestjs/common';
import {} from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiConflictResponse,
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
import { Express } from 'express';
import { STATUS_MESSAGE, SYSTEM_ERROR } from 'src/core/constants';
import {
    ArrayFieldDecorator,
    SingleFieldDecorator,
    MultiFieldDecorator,
} from './decorators';
import { FilesService } from './files.service';
import { IArrayFile, ISingleFile } from './interfaces';

@ApiTags('Files')
@ApiBearerAuth()
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
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FilesService) {}

    @Post('avatar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Upload avatar file form data (all)' })
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @SingleFieldDecorator('./public/avatars')
    async uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ISingleFile> {
        return this.fileService.uploadAvatar(file);
    }

    @Post('cover')
    @ApiOperation({ summary: 'Upload cover file form data (all)' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @SingleFieldDecorator('./public/covers')
    async uploadCover(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ISingleFile> {
        return this.fileService.uploadCover(file);
    }

    @Post('posts')
    @ApiOperation({ summary: 'Upload post with multi images (user)' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ArrayFieldDecorator('files', true, 10, './public/posts')
    async uploadPosts(
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<IArrayFile> {
        return this.fileService.uploadPosts(files);
    }

    @Post('multi')
    @ApiOperation({ summary: 'Upload multi fields form data (user)' })
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @MultiFieldDecorator(
        [
            { name: 'item_1', maxCount: 1, required: true },
            { name: 'item_2', maxCount: 1 },
            { name: 'item_3', maxCount: 1 },
            { name: 'item_4', maxCount: 1 },
            { name: 'item_5', maxCount: 1 },
        ],
        './public/multi',
    )
    async uploadMulti(
        @UploadedFiles() files: Express.Multer.File[],
    ): Promise<any> {
        return this.fileService.uploadMulti(files);
    }
}
