import { Products } from '../store/products';

export interface ShoppingItem {
  shoppingId: string;
  quantity: number;
  Totalprice: number;
  product: Products;
}
