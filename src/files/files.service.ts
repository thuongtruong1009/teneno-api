export class FilesService {
  async uploadAvatar(file: Express.Multer.File) {
    return { file: file.filename };
  }

  async uploadCover(file: Express.Multer.File) {
    return { file: file.filename };
  }

  async uploadPosts(files: Array<Express.Multer.File>) {
    return { files: files.map((file) => file.filename) };
  }

  async uploadMulti(files: Express.Multer.File[]) {
    return { files: files };
  }
}
