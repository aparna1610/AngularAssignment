import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/products/store/order";
import { ShoppingItem } from "src/app/products/store/shoppingItems";
import { AppState } from "./appstate";

export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{apiStatus: AppState}>()
);

export const AddProductToCart  = createAction(
    '[Products API] product added into Shopping Cart',
    props<{apiStatus :AppState}>()
  );
  
  export const deleteItemFromCart = createAction(
    '[Products API] Inovke delete product api',
    props<{id:number}>()
  );
  
  export const deleteProductAPISuccess = createAction(
    '[Products API] deleted product api success',
    props<{id:number}>()
  );
  
  export const updateItemFromCart  = createAction(
    '[Products API] product updated into Shopping Cart',
    props<{shopping: ShoppingItem}>()
  );

  export const showOrderDetails = createAction(
    '[Order] show order details api',
    props<{apiStatus :AppState}>()
  );

  export const deleteAllItemsFromCart = createAction(
    '[Order] delete all items from cart');