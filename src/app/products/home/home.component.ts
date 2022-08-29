import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddProductToCart } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { invokeProductsAPI } from '../store/products.action';
import { selectProducts } from '../store/products.selector';
import { ShoppingItem } from '../store/shoppingItems';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<AppState>) {}

  products$ = this.store.pipe(select(selectProducts));

  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.store.dispatch(invokeProductsAPI());
  }

  CalculateTotalPrice(basePrice: number, taxAmount: number) {
     let priceWithTax = (Number(basePrice) + (Number(basePrice) * taxAmount)/100);
     return priceWithTax;
}

  addToCart(selectedProduct: Products): void {
    const newShoppingItem = {
        quantity: 1,
        Totalprice: selectedProduct.basePrice,
        product: selectedProduct
    } as ShoppingItem;

    this.store.dispatch(AddProductToCart( { apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [newShoppingItem],  order: [] } }));
}
}
