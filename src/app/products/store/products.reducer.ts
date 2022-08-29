import { createReducer, on } from '@ngrx/store';
import { Products } from './products';
import { productsFetchAPISuccess, saveNewProductAPISucess, updateProductAPISucess } from './products.action';

export const initialState: ReadonlyArray<Products> = [];

export const productReducer = createReducer(
  initialState,
  on(productsFetchAPISuccess, (state, { allProducts }) => {
    return allProducts;
  }),
  on(saveNewProductAPISucess, (state, { newProduct }) => {
    let newState = [...state];
    newState.unshift(newProduct);
    return newState;
  }),
  on(updateProductAPISucess, (state, { updateProduct }) => {
    let newState = state.filter((_) => _.id != updateProduct.id);
    newState.unshift(updateProduct);
    return newState;
  })
);
