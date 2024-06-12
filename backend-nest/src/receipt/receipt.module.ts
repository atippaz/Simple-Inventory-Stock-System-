import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import PrismaService from 'src/utils/prisma';

@Module({
  imports: [],
  controllers: [ReceiptController],
  providers: [ReceiptService, PrismaService],
})
export default class ReceiptModule {
  constructor() {
    console.log('init product');
  }
}
