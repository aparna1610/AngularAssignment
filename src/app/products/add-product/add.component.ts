import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { invokeSaveNewProductAPI } from '../store/products.action';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}

  productForm: Products = {
    id: 0,
    name: '',
    taxAmount: 21,
    basePrice: 0,
  };

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewProductAPI({ newProduct: this.productForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apiState) => {
      if (apiState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [] } })
        );
         this.router.navigate(['/']);
      }
    });
  }
}
