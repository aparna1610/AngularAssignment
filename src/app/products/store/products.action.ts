import { createAction, props } from '@ngrx/store';
import { Products } from './products';
import { ShoppingItem } from './shoppingItems';

export const invokeProductsAPI = createAction(
  '[Products API] Invoke Products Fetch API'
);

export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch API Success',
  props<{ allProducts: Products[] }>()
);

export const invokeSaveNewProductAPI = createAction(
  '[Products API] Inovke save new product api',
  props<{ newProduct: Products }>()
);

export const saveNewProductAPISucess = createAction(
  '[Products API] save new product api success',
  props<{ newProduct: Products }>()
);

export const invokeUpdateProductAPI = createAction(
  '[Products API] Inovke update product api',
  props<{ updateProduct: Products }>()
);

export const updateProductAPISucess = createAction(
  '[Products API] update  product api success',
  props<{ updateProduct: Products }>()
);

export const addProductToCart  = createAction(
  '[Products API] product added into Shopping Cart',
  props<{shopping: ShoppingItem}>()
);
