import { Controller, Get } from '@nestjs/common';
import { ProductService } from './receipt.service';
@Controller('/product')
export class ProductController {
  constructor(private readonly appService: ProductService) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    const res = await this.appService.getAll();
    return res;
  }

  @Get(':id')
  async getOne() {
    const res = await this.appService.getAll();
    console.log(res);
    return res;
  }
}
