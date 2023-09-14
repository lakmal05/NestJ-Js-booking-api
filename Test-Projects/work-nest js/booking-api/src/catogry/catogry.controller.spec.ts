import { Test, TestingModule } from '@nestjs/testing';
import { CatogryController } from './catogry.controller';

describe('CatogryController', () => {
  let controller: CatogryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatogryController],
    }).compile();

    controller = module.get<CatogryController>(CatogryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
