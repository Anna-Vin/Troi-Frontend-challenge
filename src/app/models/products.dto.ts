import { Product } from "./product.model";

export interface ProductsReadDto {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
