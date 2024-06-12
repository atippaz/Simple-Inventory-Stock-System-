import { Module } from '@nestjs/common';
import { RequisitionController } from './requisition.controller';
import { RequisitionService } from './requisition.service';
import PrismaService from 'src/utils/prisma';

@Module({
  imports: [],
  controllers: [RequisitionController],
  providers: [RequisitionService, PrismaService],
})
export default class RequisitionModule {
  constructor() {
    console.log('init product');
  }
}
