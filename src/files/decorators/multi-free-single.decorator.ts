import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function MultiFreeSingleDecorator(path: string) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'post_1', maxCount: 1 },
          { name: 'post_2', maxCount: 1 },
          { name: 'post_3', maxCount: 1 },
          { name: 'post_4', maxCount: 1 },
          { name: 'post_5', maxCount: 1 },
        ],
        {
          storage: diskStorage({
            destination: path,
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        },
      ),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          post_1: {
            type: 'string',
            format: 'binary',
          },
          post_2: {
            type: 'string',
            format: 'binary',
          },
          post_3: {
            type: 'string',
            format: 'binary',
          },
          post_4: {
            type: 'string',
            format: 'binary',
          },
          post_5: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
