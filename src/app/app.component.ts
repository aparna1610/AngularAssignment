import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './shared/store/appstate';
import { ShoppingItem } from './products/store/shoppingItems';
import { getShoppingListItems } from './shared/store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shoppingItems$!: Observable<ShoppingItem[]>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
      this.shoppingItems$ = this.store.select(getShoppingListItems);
    }
}
