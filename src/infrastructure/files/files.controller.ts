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
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import {
  ArrayFieldDecorator,
  SingleFieldDecorator,
  MultiFieldDecorator,
} from './decorators';
import { FilesService } from './files.service';

@ApiTags('Files')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiNotFoundResponse({ description: 'Not found' })
@ApiNotAcceptableResponse({
  description: 'Provided inputs are not in correct form.',
})
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload avatar file form data' })
  @ApiOkResponse({ description: 'Success' })
  @SingleFieldDecorator('./public/avatars')
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadAvatar(file);
  }

  @Post('cover')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload cover file form data' })
  @ApiOkResponse({ description: 'Success' })
  @SingleFieldDecorator('./public/covers')
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadCover(file);
  }

  @Post('posts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload post with multi images' })
  @ApiOkResponse({ description: 'Success' })
  @ArrayFieldDecorator('files', true, 10, './public/posts')
  uploadPosts(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return this.fileService.uploadPosts(files);
  }

  @Post('multi')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload multi fields' })
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
  uploadMulti(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadMulti(files);
  }
}
