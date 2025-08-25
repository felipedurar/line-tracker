import { Module } from '@nestjs/common';
import { ManifestController } from './manifest.controller';
import { ManifestService } from './manifest.service';
import { CommonModule } from 'src/common/common.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ManifestController],
  providers: [PrismaService, ManifestService],
  imports: [CommonModule]
})
export class ManifestModule {}
