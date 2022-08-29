import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from 'src/app/products/store/order';
import { ShoppingItem } from 'src/app/products/store/shoppingItems';
import { AppState } from './appstate';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const getShoppingListItems = createSelector(
    selectAppState,
    (state): ShoppingItem[] => { return state.shopping; } 
  );

  export const getOrderDetails = createSelector(
    selectAppState,
    (state): Order[] => { return state.order; } 
  );

  export const getOrderDetailsByIdDetails = (id: number) => createSelector(
    getOrderDetails,
    (orders: Order[]): Order | undefined => {
        var orderDetails = orders.find((order) => order.shoppingItem.filter((item) => Number(item.shoppingId) == id));
        return orderDetails;
    }

);
    

