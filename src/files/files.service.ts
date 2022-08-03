import { InternalServerErrorException } from '@nestjs/common';

export class FilesService {
  async uploadAvatar(file: Express.Multer.File) {
    return { file: file.filename };
  }

  async uploadCover(file: Express.Multer.File) {
    return { file: file.filename };
  }

  async uploadPosts(files: Express.Multer.File[]) {
    try {
      const [avatar, background] = files;
      return { avatar: avatar.filename, background: background.filename };
    } catch (e) {
      throw new InternalServerErrorException(
        'Upload avatar and background failed',
      );
    }
    // return { files: files.map((file) => file.filename) };
  }

  async uploadMulti(files: Array<Express.Multer.File>) {
    return { files: files.map((file) => file.filename) };
  }
}
