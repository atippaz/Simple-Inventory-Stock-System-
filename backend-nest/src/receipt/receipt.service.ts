import { Injectable } from '@nestjs/common';
import PrismaService from '../utils/prisma';
import { promises } from 'dns';
import { ReceiptionInsert } from './recript.dto';
export interface Recription {
  product_id: number;
  product_name: string;
  category: string;
  product_description: string;
  sku_id: string;
  sku_description: string;
  created_date: Date;
  title: string;
  description: string;
  qty: number;
  cost: number;
  receipt_id: number;
}
@Injectable()
export class ReceiptService {
  constructor(private prismaService: PrismaService) {}
  async getAll() {
    return await this.prismaService.receipt.findMany({
      select: {
        receipt_id: true,
        created_date: true,
        qty: true,
        cost: true,
        title: true,
        description: true,
      },
    });
  }
  async getOne(recriptId: number): Promise<Recription | null> {
    const res = await this.prismaService.receipt.findFirstOrThrow({
      where: {
        receipt_id: {
          equals: recriptId,
        },
      },
      select: {
        product: true,
        sku: true,
        created_date: true,
        title: true,
        description: true,
        qty: true,
        cost: true,
        receipt_id: true,
      },
    });
    return {
      category: res.product.category,
      cost: parseFloat(res.cost.toString()),
      created_date: res.created_date,
      description: res.description,
      product_description: res.product.description,
      product_id: res.product.product_id,
      product_name: res.product.product_name,
      qty: res.qty,
      receipt_id: res.receipt_id,
      sku_description: res.sku.description,
      sku_id: res.sku.sku_id,
      title: res.title,
    };
  }
  async insert(receiptPayload: ReceiptionInsert) {
    try {
      const newItemId = this.prismaService.$transaction(async (prisma) => {
        const { batch_id } = await prisma.batch.create({
          data: {
            cost: receiptPayload.cost,
            qty: receiptPayload.qty,
            sku_id: receiptPayload.sku_id,
            created_date: new Date(),
          },
          select: {
            batch_id: true,
          },
        });
        const { receipt_id } = await prisma.receipt.create({
          data: {
            title: receiptPayload.title,
            cost: receiptPayload.cost,
            product_id: receiptPayload.product_id,
            batch_id: batch_id,
            created_date: new Date(),
            description: receiptPayload.description,
            qty: receiptPayload.qty,
            sku_id: receiptPayload.sku_id,
          },
          select: {
            receipt_id: true,
          },
        });
        return receipt_id;
      });

      return newItemId;
    } catch (ex) {
      console.error('Error inserting product:', ex);
      return null;
    }
  }
}
