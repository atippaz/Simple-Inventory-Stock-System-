import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductModule } from './product';
import { ReceiptModule } from './receipt';
import { RequisitionModule } from './requisition';
import { LineModule } from './line';
import { SkuModule } from './sku';

@Controller()
class AppController {
  @Get('/')
  async getHello() {
    return 'hi this is my app api';
  }
}

@Module({
  imports: [
    ProductModule,
    RequisitionModule,
    ReceiptModule,
    LineModule,
    SkuModule,
  ],
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
  app.enableCors({ origin: '*' });
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
