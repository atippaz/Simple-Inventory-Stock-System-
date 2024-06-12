import {
  BadRequestException,
  Body,
  Controller,
  Get,
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
    console.log(productId);
    const res = await this.skuService.getDropdown(parseInt(productId));
    return res;
  }
  @Post()
  async insert(@Body() payload: SkuInsert) {
    const res = await this.skuService.insert(payload);
    return res;
  }
}
