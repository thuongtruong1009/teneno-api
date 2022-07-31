import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SingleDecorator } from './decorators';
import { FileDto } from './dto';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private fileService: FilesService) {}

  @Post('avatar')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload avatar file form data' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @SingleDecorator('./public/avatars')
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
  @SingleDecorator('./public/covers')
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadCover(file);
  }

  @Post('fail-validation')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test fail validation file' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndFailValidation(
    @Body() dto: FileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.failValidation(dto, file);
  }

  @Post('pass-validation')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test pass validation file' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndPassValidation(
    @Body() dto: FileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return this.fileService.passValidation(dto, file);
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
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './public/posts',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadPosts(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.uploadPosts(files);
  }

  @Post('avatar-background')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload post with multi images' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadAvatarAndBackground(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.uploadAvatarAndBackground(files);
  }
}
