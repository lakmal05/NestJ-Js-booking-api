import { Module } from '@nestjs/common';
import { CatogryController } from './catogry.controller';
import { CatogryService } from './catogry.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CatogryController],
  providers: [CatogryService],
})
export class CatogryModule {}
