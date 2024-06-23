import { Module } from '@nestjs/common';
import { RequisitionController } from './requisition.controller';
import { RequisitionService } from './requisition.service';
import PrismaService from 'src/utils/prisma';
import { LineService } from 'src/line';

@Module({
  imports: [],
  controllers: [RequisitionController],
  providers: [RequisitionService, PrismaService, LineService],
})
export default class RequisitionModule {
  constructor() {
    console.log('init product');
  }
}
