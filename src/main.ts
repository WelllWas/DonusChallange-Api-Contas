import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Donus Code Challange')
    .setDescription('Bank accounts API documentation')
    .setVersion('1.0')
    .addTag('user')
    .addTag('transactions')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);
  
  await app.listen(3000);
}
bootstrap();
