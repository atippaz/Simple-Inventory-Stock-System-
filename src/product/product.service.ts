import { Injectable } from '@nestjs/common';
import usePrisma from '../utils/prisma';
@Injectable()
export class AppService {
  prisma = usePrisma();
  constructor() {
    console.log('service');
  }
  async getHello() {
    return await this.prisma.product.findMany();
  }
}
