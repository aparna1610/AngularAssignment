import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingItem } from 'src/app/products/store/shoppingItems';
import { AppState } from './appstate';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const getShoppingListItems = createSelector(
    selectAppState,
    (state): ShoppingItem[] => { return state.shopping; } 
  );

