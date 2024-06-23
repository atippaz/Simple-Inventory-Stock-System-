import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      const res = await this.productService.getAll();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('dropdown')
  async getDropdown() {
    try {
      const res = await this.productService.getDropdown();
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get(':id')
  async getOne(@Param() param) {
    try {
      const res = await this.productService.getOne(parseInt(param.id));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
