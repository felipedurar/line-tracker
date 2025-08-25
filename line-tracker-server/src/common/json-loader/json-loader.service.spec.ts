import { Test, TestingModule } from '@nestjs/testing';
import { JsonLoaderService } from './json-loader.service';

describe('JsonLoaderService', () => {
  let service: JsonLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLoaderService],
    }).compile();

    service = module.get<JsonLoaderService>(JsonLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
