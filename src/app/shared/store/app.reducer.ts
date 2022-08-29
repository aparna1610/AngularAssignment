import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, showOrderDetails } from './app.action';
import { AppState } from './appstate';
import { AddProductToCart, deleteItemFromCart } from './app.action';

export const initialState: AppState = {
  apiResponseMessage: '',
  apiStatus: '',
  shopping: [],
  order: [],
};

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus,
    };
  }),
  on(AddProductToCart, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus,
      shopping: state.shopping.concat(apiStatus.shopping),
      order: state.order
    };
  }),
  on(showOrderDetails, (state, { apiStatus }) => {
    return {
      ...state,
      shopping: [],
      order: state.order.concat(apiStatus.order)
    }
}),
  // on(deleteItemFromCart, (state, { id }) => {
  //   return {
  //   ...state,
  //   shopping: state.shopping.filter(item => Number(item.shoppingId) !== id)
  //   }
  // })
);