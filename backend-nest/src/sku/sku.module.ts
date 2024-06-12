import { Module } from '@nestjs/common';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';
import PrismaService from 'src/utils/prisma';

@Module({
  imports: [],
  controllers: [SkuController],
  providers: [SkuService, PrismaService],
})
export default class SkuModule {
  constructor() {}
}
