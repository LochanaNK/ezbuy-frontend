import { LargeNumberLike } from "crypto";

export interface Products {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  vendorId: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
}
