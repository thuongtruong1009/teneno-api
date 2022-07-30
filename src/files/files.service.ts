import { FileDto } from './dto';

export class FilesService {
  async uploadFile(file: Express.Multer.File) {
    return { file: file.filename };
  }

  async failValidation(dto: FileDto, file: Express.Multer.File) {
    return { dto, file: file };
  }

  async passValidation(dto: FileDto, file?: Express.Multer.File) {
    return { dto, file: file };
  }
}
