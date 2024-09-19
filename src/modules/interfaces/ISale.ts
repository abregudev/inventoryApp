import type { ICustomer } from "./ICustomers";
import type { ISaleProduct } from "./ISaleProduct";

export interface ISale {
  id: number;
  customer: ICustomer;
  date: string;
  sale_products: ISaleProduct[];
  total: string;
  payment_method?: string;
}
