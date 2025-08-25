import { Module } from '@nestjs/common';
import { JsonLoaderService } from './json-loader/json-loader.service';
import { KeyService } from './key/key.service';

@Module({
  providers: [JsonLoaderService, KeyService],
  exports: [JsonLoaderService, KeyService]
})
export class CommonModule {}
