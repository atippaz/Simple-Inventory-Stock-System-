import { Injectable } from '@nestjs/common';
import PrismaService from '../utils/prisma';
import { SkuInsert } from './sku.dto';

@Injectable()
export class SkuService {
  constructor(private prismaService: PrismaService) {}
  async getDropdown(productId: number): Promise<string[]> {
    try {
      const res = await this.prismaService.sku.findMany({
        where: {
          product_id: {
            equals: productId,
          },
        },
        select: {
          sku_id: true,
        },
      });
      console.log('resr', res);
      return res.map((x) => x.sku_id);
    } catch (ex) {
      console.log(ex);
      return [];
    }
  }
  async insert(data: SkuInsert): Promise<string | null> {
    try {
      const { sku_id } = await this.prismaService.sku.create({
        data: {
          created_date: new Date(),
          sku_id: data.sku_id,
          description: data.description,
          product_id: data.product_id,
        },
        select: {
          sku_id: true,
        },
      });
      console.log('resr', sku_id);
      return sku_id;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}
