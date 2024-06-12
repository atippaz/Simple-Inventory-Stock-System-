import { BadRequestException, Injectable } from '@nestjs/common';
import PrismaService from '../utils/prisma';
import { RequisitionInsert } from './recript.dto';
export interface Requisition {
  product_id: number;
  product_name: string;
  category: string;
  product_description: string;
  sku_id: string;
  sku_description: string;
  created_date: Date;
  title: string;
  description: string;
  requisition_id: number;
  items: item[];
}
interface item {
  batch_id: number;
  qty: number;
  cost: number;
}
@Injectable()
export class RequisitionService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    return await this.prismaService.requisition.findMany({
      select: {
        requisition_id: true,
        created_on: true,
        title: true,
        requisition_item: true,
        description: true,
      },
    });
  }
  async getOne(requisitionId: number): Promise<Requisition | null> {
    const res = await this.prismaService.requisition.findFirstOrThrow({
      where: {
        requisition_id: {
          equals: requisitionId,
        },
      },
      select: {
        product: true,
        sku: true,
        requisition_item: true,
        created_on: true,
        title: true,
        description: true,
        requisition_id: true,
      },
    });
    console.log('requisition', res);
    return {
      category: res.product.category,
      created_date: res.created_on,
      description: res.description,
      product_description: res.product.description,
      product_id: res.product.product_id,
      product_name: res.product.product_name,
      requisition_id: res.requisition_id,
      sku_description: res.sku.description,
      sku_id: res.sku.sku_id,
      title: res.title,
      items: res.requisition_item.map((x) => {
        return {
          batch_id: x.batch_id,
          qty: x.qty,
          cost: parseFloat(x.cost.toString()),
        };
      }),
    };
  }
  async insert(requisitionPayload: RequisitionInsert) {
    try {
      const newItemId = this.prismaService.$transaction(async (prisma) => {
        const batItem = await prisma.batch.findMany({
          select: {
            batch_id: true,
            qty: true,
            cost: true,
          },
          orderBy: {
            created_date: 'asc',
          },
          where: {
            AND: [
              {
                sku_id: {
                  equals: requisitionPayload.sku_id,
                },
              },
              {
                qty: {
                  gt: 0,
                },
              },
            ],
          },
        });
        let removeItemInStore = requisitionPayload.qty;
        console.log('before', batItem);
        const updateBatchItem = batItem.map((x) => {
          if (removeItemInStore <= 0) return x;
          let qty = x.qty;
          if (removeItemInStore > qty) {
            removeItemInStore -= qty;
            qty = 0;
          } else {
            qty -= removeItemInStore;
            removeItemInStore = 0;
          }
          return {
            batch_id: x.batch_id,
            qty: qty,
            cost: x.cost,
          };
        });
        if (updateBatchItem.some((x) => x.qty < 0) || removeItemInStore > 0)
          throw new BadRequestException();
        const updatedBatch = updateBatchItem.filter(
          (x, index) => !batItem.includes(x),
        );
        console.log('update', updatedBatch);
        updatedBatch.forEach(async (x) => {
          await prisma.batch.update({
            data: {
              qty: x.qty,
            },
            where: {
              batch_id: x.batch_id,
            },
          });
        });

        const { requisition_id } = await prisma.requisition.create({
          data: {
            created_on: new Date(),
            description: requisitionPayload.description,
            sku_id: requisitionPayload.sku_id,
            product_id: requisitionPayload.product_id,
            title: requisitionPayload.title,
          },
          select: {
            requisition_id: true,
          },
        });
        await prisma.requisition_item.createMany({
          data: updatedBatch.map((x) => {
            const oldBatch = batItem.find((f) => f.batch_id == x.batch_id);
            return {
              batch_id: x.batch_id,
              cost: x.cost,
              qty: oldBatch.qty - x.qty,
              requisition_id: requisition_id,
            };
          }),
        });
        return requisition_id;
      });
      return newItemId;
    } catch (ex) {
      console.error('Error inserting product:', ex);
      return null;
    }
  }
}
