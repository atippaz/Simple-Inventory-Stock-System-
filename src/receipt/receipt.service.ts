import { Injectable } from '@nestjs/common';
import PrismaService from '../utils/prisma';
@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    return await this.prismaService.product.findMany();
  }
}
