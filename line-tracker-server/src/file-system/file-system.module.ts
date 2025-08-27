import { Module } from '@nestjs/common';
import { FileSystemController } from './file-system.controller';
import { FileSystemService } from './file-system.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [FileSystemController],
  providers: [FileSystemService],
  imports: [ SocketModule ]
})
export class FileSystemModule {}
