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
import { SkuService } from './sku.service';
import { SkuInsert } from './sku.dto';
@Controller('/sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {
    console.log('controller');
  }
  @Get(':productId/dropdown')
  async getDropdown(@Param('productId') productId: string) {
    try {
      const res = await this.skuService.getDropdown(parseInt(productId));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post()
  async insert(@Body() payload: SkuInsert) {
    try {
      const res = await this.skuService.insert(payload);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
