import { inject, Injectable } from '@angular/core';
import {
  map,
  catchError,
  Observable,
  of,
  tap,
  throwError,
  switchMap,
  shareReplay,
  BehaviorSubject,
  filter,
  combineLatest,
} from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductData } from './product-data.ts';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private httpReviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  productSelected$ = this.productSelectedSubject.asObservable();

  constructor() {}
  private products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((p) => console.log(JSON.stringify(p))),
    shareReplay(1),
    catchError((err) => this.handleError(err))
  );
  products = toSignal(this.products$, { initialValue: [] as Product[] });

  readonly product2$ = this.productSelected$.pipe(
    filter((id) => id != undefined),
    switchMap((id) => {
      return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
        tap(() => console.log('Product retrieved by id', id)),
        switchMap((product: Product) => this.getProductsWithReviews(product)),
        tap((x) => console.log(x)),
        catchError((err) => this.handleError(err))
      );
    })
  );

  product$ = combineLatest([this.productSelected$, this.products$]).pipe(
    map(([selectedId, products]) =>
      products.find((product: Product) => product.id === selectedId)
    ),
    filter((id) => id != undefined),
    tap((x) => console.log(x)),
    switchMap((product: Product) => this.getProductsWithReviews(product)),
    catchError((err) => this.handleError(err))
  );

  productSelected(productId: number): void {
    this.productSelectedSubject.next(productId);
  }

  getProductsWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.httpReviewService.getReviewUrl(product.id))
        .pipe(map((reviews: Review[]) => ({ ...product, reviews } as Product)));
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    var formattedError = this.httpErrorService.formatError(err);
    return throwError(() => of(formattedError));
  }
}
