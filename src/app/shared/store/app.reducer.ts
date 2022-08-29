import { createReducer, on } from '@ngrx/store';
import { deleteAllItemFromCart, setAPIStatus, updateItemFromCart } from './app.action';
import { AppState } from './appstate';
import { AddProductToCart, deleteItemFromCart } from './app.action';

export const initialState: AppState = {
  apiResponseMessage: '',
  apiStatus: '',
  shopping: [],
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
      shopping: state.shopping.concat(apiStatus.shopping)
    };
  }),
  // on(updateItemFromCart, (state, { shopping }) => {
  //       let newState = state.shopping.filter((item) => item.id != shopping.id);
  //       newState.concat(newState);
  //       return newState;
  //   }),
  // on(deleteItemFromCart, (state, { id }) => {
  //   return {
  //   ...state,
  //   shopping: state.shopping.filter(item => Number(item.shoppingId) !== id)
  //   }
  // }),
  // on(deleteAllItemFromCart, (state) => {
  //   return {
  //     ...state,
  //     shopping: []
  //   }
  // })
);