import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptor/user.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CatogryModule } from './catogry/catogry.module';
import { ProductModule } from './product/product.module';
import { DocumentModule } from './document/document.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    HomeModule,
    UserModule,
    PrismaModule,
    CatogryModule,
    ProductModule,
    DocumentModule,
    TablesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },

    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
