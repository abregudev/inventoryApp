import type IProduct from "./IProduct";

export interface ISaleProduct {
    id: number;
    product: IProduct;
    quantity: number;
    price: string;
  }