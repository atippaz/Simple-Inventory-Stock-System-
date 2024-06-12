import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptionInsert } from './recript.dto';
@Controller('/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    const res = await this.receiptService.getAll();
    return res;
  }

  @Get(':id')
  async getOne(@Param() param) {
    const res = await this.receiptService.getOne(parseInt(param.id));
    console.log(res);
    return res;
  }

  @Post()
  async insertReceipt(@Body() body: ReceiptionInsert) {
    if (Object.values(body).some((x) => x === null || x === ''))
      throw new BadRequestException('bad request');
    const result = await this.receiptService.insert(body);
    return result;
  }
}
