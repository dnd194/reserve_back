import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get<any>('server');
  const port = serverConfig.port || 3001;

  app.enableCors({
    origin: 'http://localhost:3000', // 프론트 주소
    credentials: true,               // 쿠키/Authorization 헤더 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
