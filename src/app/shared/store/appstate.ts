import { Order } from "src/app/products/store/order";
import { ShoppingItem } from "src/app/products/store/shoppingItems";

export interface AppState {
  apiStatus: string;
  apiResponseMessage: string;
  shopping: ShoppingItem[];
  order: Order[];
}
