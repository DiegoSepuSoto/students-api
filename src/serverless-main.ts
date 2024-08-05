import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import * as fs from 'fs';
import * as YAML from 'yaml';

let serverlessHandler: Handler;

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

  await app.init();

  const appAdapter = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: appAdapter });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  serverlessHandler = serverlessHandler ?? (await bootstrap());

  return serverlessHandler(event, context, callback);
};
