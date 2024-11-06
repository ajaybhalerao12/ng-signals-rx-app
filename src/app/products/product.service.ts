import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductData } from './product-data.ts';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(
        () => console.log('Products fetched'),
        catchError((err) => this.handleError(err))
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      tap(
        () => console.log('Product retrieved by id', id),
        catchError((err) => this.handleError(err))
      )
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    var formattedError = this.httpErrorService.formatError(err);
    return throwError(() => of(formattedError));
    // return formattedError;
  }
}
