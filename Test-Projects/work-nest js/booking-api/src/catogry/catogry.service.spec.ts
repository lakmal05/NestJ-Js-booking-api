import { Test, TestingModule } from '@nestjs/testing';
import { CatogryService } from './catogry.service';

describe('CatogryService', () => {
  let service: CatogryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatogryService],
    }).compile();

    service = module.get<CatogryService>(CatogryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
