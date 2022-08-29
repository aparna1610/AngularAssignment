import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Order } from '../products/store/order';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
    order = { shoppingItem: [] } as unknown as Order;

    constructor(private productService: ProductsService, private route: ActivatedRoute) { }

    ngOnInit() {
        // this.route.params.subscribe(
        //     params => {
        //         const id = +params.code;
        //         this.getOrder(id);
        //     }
        // );
    }

    // getOrder(id: number): void {
    //     this.orderService.getWithId(id)
    //         .subscribe(
    //             data => this.order = data,
    //             error => { }
    //         );
    // }
}
