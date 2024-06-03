import { Controller, Get } from '@nestjs/common';
import { AppService } from './product.service';
@Controller('/product')
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('controller');
  }

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}
