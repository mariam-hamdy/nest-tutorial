import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.enableCors({origin:'*'})
  await app.listen(port, () => {
    console.log(`the server is listening on port ${port}`)
  });
}
bootstrap();
