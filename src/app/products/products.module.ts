import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffect } from './store/products.effect';
import { AddComponent } from './add-product/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit-product/edit.component';
import { CartDetailsComponent } from '../cart/cart-details.component/cart-details.component';
import { CartItemsComponent } from '../cart/cart-details.component/cart-items.component';
import { OrderDetailsComponent } from '../order/order-details.component';
import { OrderListComponent } from '../order/order-list.component';
@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent, CartDetailsComponent, CartItemsComponent, OrderDetailsComponent, OrderListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    StoreModule.forFeature('myproducts', productReducer),
    EffectsModule.forFeature([ProductsEffect])
  ],
})
export class ProductsModule {}
