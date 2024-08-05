import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

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
