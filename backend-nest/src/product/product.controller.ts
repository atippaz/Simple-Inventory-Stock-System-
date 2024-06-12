import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { InsertProduct } from './product.dto';
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    console.log('controller');
  }

  @Get()
  async getAll() {
    console.log('sdasdsa');

    const res = await this.productService.getAll();
    return res;
  }
  @Get('dropdown')
  async getDropdown() {
    console.log('sdasdsa');
    const res = await this.productService.getDropdown();
    console.log(res);

    return res;
  }
  @Get(':id')
  async getOne(@Param() param) {
    const res = await this.productService.getOne(parseInt(param.id));
    return res;
  }

  @Post()
  async create(@Body() createProductDto: InsertProduct) {
    try {
      const id = await this.productService.insert(createProductDto);
      return { id };
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
