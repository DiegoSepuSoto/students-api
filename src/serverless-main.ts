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
