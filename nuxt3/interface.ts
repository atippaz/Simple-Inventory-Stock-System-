export interface Receipt {
  receipt_id: number;
  title: string;
  description: string;
  qty: number;
  cost: number;
}
export interface ReceiptDetail {
  category: string;
  cost: number;
  created_date: string;
  description: string;
  product_description: string;
  product_id: number;
  product_name: string;
  qty: number;
  receipt_id: number;
  sku_description: string;
  sku_id: string;
  title: string;
}
export interface Product {
  product_id: number;
  product_name: string;
  category: string;
  description: string;
  sku: Sku[];
}
export interface ProductInsert {
  product_name: string;
  category: string;
  description: string;
  sku: SkuProductInsert[];
}
export interface SkuProductInsert {
  sku_id: string;
  description: string;
}
export interface SkuInsert extends SkuProductInsert {
  product_id: number;
}
export interface Sku {
  cost: number;
  qty: number;
  sku_id: string;
}
export interface InsertFormReceiption {
  product_id: number | null;
  sku_id: string | null;
  qty: number;
  cost: number;
  title: string;
  description: string;
}
export interface InsertFormRequisition {
  product_id: number | null;
  sku_id: string | null;
  qty: number;
  title: string;
  description: string;
}
export interface ProductDropdown {
  product_name: string;
  product_id: number;
}
