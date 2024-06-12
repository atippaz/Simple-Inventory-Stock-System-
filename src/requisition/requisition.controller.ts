import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RequisitionService } from './requisition.service';
import { RequisitionInsert } from './recript.dto';
@Controller('/requisition')
export class RequisitionController {
  constructor(private readonly requisitionService: RequisitionService) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    const res = await this.requisitionService.getAll();
    return res;
  }

  @Get(':id')
  async getOne(@Param() param) {
    const res = await this.requisitionService.getOne(parseInt(param.id));
    console.log(res);
    return res;
  }

  @Post()
  async insertReceipt(@Body() body: RequisitionInsert) {
    if (Object.values(body).some((x) => x === null || x === ''))
      throw new BadRequestException('bad request');
    const result = await this.requisitionService.insert(body);
    return result;
  }
}
