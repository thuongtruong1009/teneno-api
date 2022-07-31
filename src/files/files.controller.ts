import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/avatars',
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/covers',
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
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadCover(file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('fail-validation')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test fail validation file' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
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

  @UseInterceptors(FileInterceptor('file'))
  @Post('pass-validation')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test pass validation file' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {file}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
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
}
