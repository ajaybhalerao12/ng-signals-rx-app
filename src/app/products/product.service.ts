import { inject, Injectable } from '@angular/core';
import { map, catchError, Observable, of, tap, throwError, switchMap } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductData } from './product-data.ts';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private httpReviewService = inject(ReviewService);

  constructor() {}
  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap(
      () => console.log('Products fetched'),
      catchError((err) => this.handleError(err))
    )
  );

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`)
    .pipe(
      tap(() => console.log('Product retrieved by id', id)),
      switchMap((product:Product)=> this.getProductsWithReviews(product)),
      tap(x=>console.log(x)),
      catchError((err) => this.handleError(err))

    );
  }

  getProductsWithReviews(product:Product): Observable<Product> {
    if(product.hasReviews){
      return this.http.get<Review[]>(this.httpReviewService.getReviewUrl(product.id))
      .pipe(
        map((reviews: Review[]) => ({...product, reviews} as Product))
      )
    }else{
      return of(product);
    }
  }


  private handleError(err: HttpErrorResponse): Observable<never> {
    var formattedError = this.httpErrorService.formatError(err);
    return throwError(() => of(formattedError));
    // return formattedError;
  }
}
