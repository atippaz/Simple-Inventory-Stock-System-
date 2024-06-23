import { Injectable, InternalServerErrorException } from '@nestjs/common';
import PrismaService from '../utils/prisma';
import { InsertProduct } from './product.dto';
export interface ProductOne {
  product_id: number;
  product_name: string;
  create_date: Date;
  category: string;
  description: string;
  sku: SkuBatch[];
}
interface SkuBatch {
  description: string;
  sku_id: string;
  batch: { qty: number; batch_id: number; cost: number }[];
}
export interface Product {
  product_id: number;
  product_name: string;
  create_date: Date;
  category: string;
  description: string;
  sku: Sku[];
}
interface Sku {
  description: string;
  sku_id: string;
  qty: number;
}
export interface Dropdown {
  product_id: number;
  product_name: string;
}
@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async getAll(): Promise<Product[]> {
    try {
      const res = await this.prismaService.product.findMany({
        include: {
          sku: {
            select: {
              description: true,
              sku_id: true,
              batch: {
                select: {
                  qty: true,
                },
              },
            },
          },
        },
      });
      return res.map((x) => {
        return {
          product_id: x.product_id,
          product_name: x.product_name,
          create_date: x.create_date,
          category: x.category,
          description: x.description,
          sku: x.sku.map((sku) => {
            return {
              description: sku.description,
              sku_id: sku.sku_id,
              qty: sku.batch.reduce((sum, batch) => sum + batch.qty, 0),
            };
          }),
        };
      });
    } catch (ex) {
      console.log(ex);
      return [];
    }
  }
  async getDropdown(): Promise<Dropdown[]> {
    try {
      console.log('sdasdsa');

      const res = await this.prismaService.product.findMany({
        select: {
          product_name: true,
          product_id: true,
        },
      });
      console.log(res);
      return res.map<Dropdown>((x) => {
        return {
          product_id: x.product_id,
          product_name: x.product_name,
        };
      });
    } catch (ex) {
      return [];
    }
  }
  async getOne(id: number): Promise<ProductOne | null> {
    try {
      const res = await this.prismaService.product.findMany({
        where: {
          product_id: {
            equals: id,
          },
        },
        include: {
          sku: {
            select: {
              description: true,
              sku_id: true,
              batch: {
                select: {
                  qty: true,
                  batch_id: true,
                  cost: true,
                },
                where: {
                  qty: {
                    gt: 0,
                  },
                },
              },
            },
          },
        },
      });
      return res.map((x) => {
        return {
          product_id: x.product_id,
          product_name: x.product_name,
          create_date: x.create_date,
          category: x.category,
          description: x.description,
          sku: x.sku.map((sku) => {
            return {
              description: sku.description,
              sku_id: sku.sku_id,
              batch: sku.batch.map((m) => {
                return {
                  qty: m.qty,
                  batch_id: m.batch_id,
                  cost: parseFloat(`${m.cost}`),
                };
              }),
            };
          }),
        };
      })[0];
    } catch (ex) {
      return null;
    }
  }
  async insert(item: InsertProduct): Promise<number | null> {
    try {
      const product_id = await this.prismaService.$transaction(
        async (prisma) => {
          const { product_id } = await prisma.product.create({
            data: {
              create_date: new Date(),
              product_name: item.product_name,
              description: item.description,
              category: item.category,
            },
            select: {
              product_id: true,
            },
          });
          if (item.sku.length > 0) {
            await prisma.sku.createMany({
              data: item.sku.map((x) => {
                return {
                  created_date: new Date(),
                  product_id: product_id,
                  description: x.description,
                  sku_id: x.sku_id,
                };
              }),
            });
          }
          return product_id;
        },
      );
      return product_id;
    } catch (ex) {
      console.error('Error inserting product:', ex);
      throw new InternalServerErrorException();
    }
  }
}
