import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../products/store/order';
import { getOrderDetailsByIdDetails } from '../shared/store/app.selector';
import { AppState } from '../shared/store/appstate';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
    order$!: Observable<Order | undefined>;

    constructor(private route: ActivatedRoute,private store: Store<AppState>) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.order$ = this.store.select(getOrderDetailsByIdDetails(id));
            }
        );
    }
}
