import { ISingleFile, IArrayFile } from './interfaces';

export class FilesService {
  async uploadAvatar(file: Express.Multer.File): Promise<ISingleFile> {
    return {
      originalName: file.originalname,
      fileName: file.filename,
      size: file.size,
    };
  }

  async uploadCover(file: Express.Multer.File): Promise<ISingleFile> {
    return {
      originalName: file.originalname,
      fileName: file.filename,
      size: file.size,
    };
  }

  async uploadPosts(files: Array<Express.Multer.File>): Promise<IArrayFile> {
    return {
      files: files.map((file) => {
        return {
          originalName: file.originalname,
          fileName: file.filename,
          size: file.size,
        };
      }),
    };
  }

  async uploadMulti(files: Express.Multer.File[]): Promise<any> {
    return { files: files };
  }
}
