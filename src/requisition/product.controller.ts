import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
@Controller('/product')
export class AppController {
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
