import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';
import fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Students API')
    .setDescription(
      'API that provides the information for a future Students Dashboard',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const yamlString = YAML.stringify(document);
  fs.writeFileSync('./openapi.yaml', yamlString);

  await app.listen(3000);
}

bootstrap();
