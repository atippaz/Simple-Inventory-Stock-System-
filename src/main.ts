import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import ProductModule from './product/product.module';
@Controller()
class AppController {
  @Get('/')
  async getHello() {
    return 'hi this is my app api';
  }
}

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [],
})
class AppModule {
  constructor() {
    console.log('init');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
