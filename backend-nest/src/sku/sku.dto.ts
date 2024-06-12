export interface SkuInsert extends BaseSkuInsert {
  product_id: number;
}
export interface BaseSkuInsert {
  sku_id: string;
  description: string;
}
