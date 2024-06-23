import { Module } from '@nestjs/common';
import { RequisitionController } from './requisition.controller';
import { RequisitionService } from './requisition.service';
import PrismaService from 'src/utils/prisma';
import { LineModule } from 'src/line';

@Module({
  imports: [LineModule],
  controllers: [RequisitionController],
  providers: [RequisitionService, PrismaService],
})
export default class RequisitionModule {
  constructor() {
    console.log('init product');
  }
}
