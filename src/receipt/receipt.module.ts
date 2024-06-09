import { Module } from '@nestjs/common';
import { ProductController } from './receipt.controller';
import { ProductService } from './receipt.service';
import PrismaService from 'src/utils/prisma';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export default class AppModule {
  constructor() {
    console.log('init product');
  }
}
