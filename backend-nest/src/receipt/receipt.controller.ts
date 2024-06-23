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
import { ReceiptService } from './receipt.service';
import { ReceiptionInsert } from './recript.dto';
@Controller('/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    try {
      const res = await this.receiptService.getAll();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getOne(@Param() param) {
    try {
      const res = await this.receiptService.getOne(parseInt(param.id));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async insertReceipt(@Body() body: ReceiptionInsert) {
    if (Object.values(body).some((x) => x === null || x === ''))
      throw new BadRequestException('bad request');
    try {
      const result = await this.receiptService.insert(body);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
