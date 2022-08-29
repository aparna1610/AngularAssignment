import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Products } from './store/products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user result', () => {
    const response = {
      products: [
        {
          name: {
            title: 'Mr',
            first: 'Peter',
            last: 'Parker'
          }
        }
      ]
    }

    service.get().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.length).toEqual(1);
    })

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
