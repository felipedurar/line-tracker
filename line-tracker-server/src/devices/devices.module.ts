import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DevicesController],
  providers: [PrismaService, DevicesService]
})
export class DevicesModule {}
