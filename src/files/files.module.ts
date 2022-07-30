import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
