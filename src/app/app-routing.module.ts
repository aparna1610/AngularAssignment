import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './cart/cart-details.component/cart-details.component';
import { OrderDetailsComponent } from './order/order-details.component';
import { OrderListComponent } from './order/order-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./products/products.module').then((product) => product.ProductsModule),
  },
  { path: 'cart-detail', component: CartDetailsComponent },
  { path: 'order-detail', component: OrderListComponent },
  { path: 'order-detail/:id', component: OrderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
