import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [FilesService],
  controllers: [FileController],
  providers: [FilesService],
})
export class FilesModule {}
