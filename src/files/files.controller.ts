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
  ApiOperation,
  ApiResponse,
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
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('avatar')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload avatar file form data' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @SingleFieldDecorator('./public/avatars')
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadAvatar(file);
  }

  @Post('cover')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload cover file form data' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @SingleFieldDecorator('./public/covers')
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadCover(file);
  }

  @Post('posts')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload post with multi images' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ArrayFieldDecorator('files', true, 10, './public/posts')
  uploadPosts(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return this.fileService.uploadPosts(files);
  }

  @Post('multi')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload multi fields' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
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
