import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/store/appstate';
import { Order } from '../products/store/order';
import { getOrderDetails } from '../shared/store/app.selector';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders$ = this.store.select(getOrderDetails);
  }
}
