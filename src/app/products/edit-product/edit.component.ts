import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { invokeUpdateProductAPI } from '../store/products.action';
import { selectProductById } from '../store/products.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<AppState>
  ) {}

  productForm: Products = {
    id: 0,
    name: '',
    taxAmount: 21,
    basePrice: 0,
  };

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('code'));
        return this.store.pipe(select(selectProductById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.productForm = { ...data };
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  udapte() {
    this.store.dispatch(
      invokeUpdateProductAPI({ updateProduct: { ...this.productForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '', shopping: [], order: [] } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
