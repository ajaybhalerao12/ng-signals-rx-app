import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(tap(() => console));
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(`${this.productsUrl}/${id}`)
    .pipe(tap(() => console.log('Product retrieved by id',id)));
  }
}
