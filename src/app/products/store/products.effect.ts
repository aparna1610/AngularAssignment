import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { setAPIStatus, deleteItemFromCart, deleteProductAPISuccess } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/appstate';
import { ProductsService } from '../products.service';
import {
  productsFetchAPISuccess,
  invokeProductsAPI,
  invokeSaveNewProductAPI,
  invokeUpdateProductAPI,
  saveNewProductAPISucess,
  updateProductAPISucess,
} from './products.action';
import { selectProducts } from './products.selector';

@Injectable()
export class ProductsEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store,
    private appStore: Store<AppState>
  ) {}

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeProductsAPI),
      withLatestFrom(this.store.pipe(select(selectProducts))),
      mergeMap(([, productformStore]) => {
        if (productformStore.length > 0) {
          return EMPTY;
        }
        return this.productsService
          .get()
          .pipe(map((data) => productsFetchAPISuccess({ allProducts: data })));
      })
    )
  );

  saveNewProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewProductAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [] } })
        );
        return this.productsService.create(action.newProduct).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success', shopping: [] },
              })
            );
            return saveNewProductAPISucess({ newProduct: data });
          })
        );
      })
    );
  });

  updateProductAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateProductAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [] } })
        );
        return this.productsService.update(action.updateProduct).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success', shopping: [] },
              })
            );
            return updateProductAPISucess({ updateProduct: data });
          })
        );
      })
    );
  });

  deleteProductsAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteItemFromCart),
      switchMap((actions) => {
        // this.appStore.dispatch(
        //   setAPIStatus(apiStatus: [])
        // );
        return this.productsService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success', shopping: [] },
              })
            );
            return deleteProductAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
