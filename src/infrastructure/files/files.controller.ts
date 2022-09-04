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
import {
  ArrayFieldDecorator,
  SingleFieldDecorator,
  MultiFieldDecorator,
} from './decorators';
import { FilesService } from './files.service';
import { IArrayFile, ISingleFile } from './interfaces';

@ApiTags('Files')
@ApiBearerAuth()
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
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload avatar file form data (all)' })
  @ApiOkResponse({ description: 'Success' })
  @SingleFieldDecorator('./public/avatars')
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ISingleFile> {
    return this.fileService.uploadAvatar(file);
  }

  @Post('cover')
  @ApiOperation({ summary: 'Upload cover file form data (all)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  @SingleFieldDecorator('./public/covers')
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ISingleFile> {
    return this.fileService.uploadCover(file);
  }

  @Post('posts')
  @ApiOperation({ summary: 'Upload post with multi images (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  @ArrayFieldDecorator('files', true, 10, './public/posts')
  async uploadPosts(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IArrayFile> {
    return this.fileService.uploadPosts(files);
  }

  @Post('multi')
  @ApiOperation({ summary: 'Upload multi fields form data (user)' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
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
