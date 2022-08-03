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
  ArraySingleDecorator,
  FreeSingleDecorator,
  MultiFreeSingleDecorator,
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
  @FreeSingleDecorator('./public/avatars')
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
  @FreeSingleDecorator('./public/covers')
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadCover(file);
  }

  @Post('posts')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload single avatar and single cover background' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @MultiFreeSingleDecorator('./public/posts')
  uploadPosts(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return this.fileService.uploadPosts(files);
  }

  @Post('multi')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload post with multi images' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ArraySingleDecorator('./public/array')
  uploadMulti(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.uploadMulti(files);
  }
}
