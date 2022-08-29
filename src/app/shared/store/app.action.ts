import { createAction, props } from "@ngrx/store";
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
    '[Books API] Inovke delete book api',
    props<{id:number}>()
  );
  
  export const deleteProductAPISuccess = createAction(
    '[Books API] deleted book api success',
    props<{id:number}>()
  );
  
  export const updateItemFromCart  = createAction(
    '[Products API] product updated into Shopping Cart',
    props<{shopping: ShoppingItem}>()
  );

  export const deleteAllItemFromCart  = createAction(
    '[Products API] product deleted from Shopping Cart');

  export const UpdateItem = createAction(
    '[Products API] product added into Shopping Cart',
    props<{payload: ShoppingItem}>()
  );