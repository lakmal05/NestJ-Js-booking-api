import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//ValidatationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //pipes use krnne fornt end eke idn data eddi controller handler ekta enna klain validate krna eka
      whitelist: true,
      transform: true, //front end ekn ena datatypes dto eke thiyna data type ekta kiyla expet krnewa
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with the origin of your frontend application

    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();

// to genarate module
//nest g module <module-name>

//nest g controller <new-controller-name> <module-name>
// after this must in mouler @mudle with conrollers:[<controller-name>]

// nest g service <service-name> <module-name>
// after this must in mouler @mudle with providers:[<controller-name>]

// install prisma
// initialze prisma--> npx prisma init

// database
// pgadmin-->postgresql gui

//  to push db
// npx prisma db push

// to chect updte in db
// npx prisam studtio

// installed class-transformer
// installed class-validator
