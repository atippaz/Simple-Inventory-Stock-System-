import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RequisitionService } from './requisition.service';
import { RequisitionInsert } from './recript.dto';
import { LineService } from 'src/line';
@Controller('/requisition')
export class RequisitionController {
  constructor(
    private readonly requisitionService: RequisitionService,
    private readonly lineService: LineService,
  ) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    try {
      const res = await this.requisitionService.getAll();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getOne(@Param() param) {
    try {
      const res = await this.requisitionService.getOne(parseInt(param.id));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async insertReceipt(@Body() body: RequisitionInsert) {
    if (Object.values(body).some((x) => x === null || x === ''))
      throw new BadRequestException('bad request');
    try {
      const result = await this.requisitionService.insert(body);
      try {
        await this.lineService.sendRequisitionData(body);
      } catch (ex) {
        console.error(ex);
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
