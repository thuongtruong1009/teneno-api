import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export type UploadFields = MulterField & { required?: boolean };

export function MultiFieldDecorator(
  uploadFields: UploadFields[],
  path: string,
) {
  const bodyProperties: Record<string, SchemaObject | ReferenceObject> =
    Object.assign(
      {},
      ...uploadFields.map((field) => {
        return { [field.name]: { type: 'string', format: 'binary' } };
      }),
    );

  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(uploadFields, {
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
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: bodyProperties,
        required: uploadFields.filter((f) => f.required).map((f) => f.name),
      },
    }),
  );
}
