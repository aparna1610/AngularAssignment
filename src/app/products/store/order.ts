import { ShoppingItem } from './shoppingItems';

export interface Order {
    orderId: number;
    orderDate: Date;
    orderTotal: number;
    shoppingItem: ShoppingItem[];
}
