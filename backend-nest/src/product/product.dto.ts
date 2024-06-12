import { BaseSkuInsert } from 'src/sku/sku.dto';

export interface InsertProduct {
  product_name: string;
  category: string;
  description: string;
  sku: BaseSkuInsert[];
}
