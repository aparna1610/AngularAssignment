import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingItem } from 'src/app/products/store/shoppingItems';
import { AppState } from 'src/app/shared/store/appstate';
import { getShoppingListItems } from 'src/app/shared/store/app.selector';

@Component({
    selector: 'app-cart-items',
    templateUrl: './cart-items.component.html'
})
export class CartItemsComponent implements OnInit {
    shoppingItems$!: Observable<ShoppingItem[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.shoppingItems$ = this.store.select(getShoppingListItems);
    }
}
