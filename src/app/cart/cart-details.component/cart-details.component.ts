import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ShoppingItem } from 'src/app/products/store/shoppingItems';
import { Order } from 'src/app/products/store/order';
import { AppState } from 'src/app/shared/store/appstate';
import { ProductsService } from 'src/app/products/products.service';
import { deleteItemFromCart, setAPIStatus, showOrderDetails, updateItemFromCart } from 'src/app/shared/store/app.action';
import { getShoppingListItems } from 'src/app/shared/store/app.selector';
import { selectAppState } from '../../shared/store/app.selector';

@Component({
    selector: 'app-cart-detail',
    templateUrl: './cart-details.component.html'
})
export class CartDetailsComponent implements OnInit {
    shoppingItems$!: Observable<ShoppingItem[]>;
    cartSubtotal!: number;
    items!: ShoppingItem[];
    isOrderCreated = false;
    order = { shoppingItem: [] } as unknown as Order;
    quantities: number[] = [1, 2, 3];

    constructor(private store: Store<AppState>,
                public router: Router,
                private productService: ProductsService) { }

    ngOnInit() {
        this.shoppingItems$ = this.store.select(getShoppingListItems);
        this.calculateSubtotal();
    
    }

    removeItemFromCart(id: any): void {
        this.store.dispatch(deleteItemFromCart(id));
        this.calculateSubtotal();
    }

    calculateSubtotal(): void {
        this.shoppingItems$.subscribe(x => this.items = x);
        this.cartSubtotal = this.items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.Totalprice), 0);
    }

    onQuantityChange(shoppingItem: ShoppingItem) {
        const quantity: number = Number(shoppingItem.quantity);
        shoppingItem.quantity = quantity;
        shoppingItem.Totalprice = Number(shoppingItem.product.basePrice) * Number(quantity);
        this.store.dispatch(updateItemFromCart({ shopping: shoppingItem }));
        this.calculateSubtotal();
    }

    proceedToCheckout(): void {
        let newOrder: Order = {
          orderDate: new Date(),
          shoppingItem: [],
          orderTotal: 0,
          orderId: 0
        };
        newOrder.orderDate = new Date();
        newOrder.shoppingItem = this.items;
        newOrder.orderTotal = this.cartSubtotal;
        this.store.dispatch(showOrderDetails( { apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [],  order: [newOrder] } }));
        this.afterOrderCreated();
    }

    delete(item: ShoppingItem) {
      this.store.dispatch(
        deleteItemFromCart({
          id: item.product.id,
        })
      );
      let apiStatus$ = this.store.pipe(select(selectAppState));
      apiStatus$.subscribe((apState) => {
        if (apState.apiStatus == 'success') {
          this.store.dispatch(
            setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [ ], order: [] } })
          );
        }
      });
    }

    afterOrderCreated(): void {
        this.isOrderCreated = true;
        this.router.navigate(['/order-detail']);
    }
}
