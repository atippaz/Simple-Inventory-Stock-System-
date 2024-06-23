import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductModule } from './product';
import { ReceiptModule } from './receipt';
import { RequisitionModule } from './requisition';
import { LineModule } from './line';
import { SkuModule } from './sku';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
@Controller()
class AppController {
  @Get('/')
  async getHello() {
    return { message: 'Welcome to Inventory System' };
  }
}

@Module({
  imports: [
    ProductModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          // secretOrPrivateKey: env.JWT_SECRET.toString(),
          signOptions: { expiresIn: '60m' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    AuthModule,
    RequisitionModule,
    ReceiptModule,
    UserModule,
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
  app.use(cookieParser());
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
