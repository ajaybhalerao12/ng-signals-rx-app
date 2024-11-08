import { computed, inject, Injectable, signal } from '@angular/core';
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
import { Product, Result } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductData } from './product-data.ts';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private httpReviewService = inject(ReviewService);

  selectedProductId = signal<number | undefined>(undefined);

  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    map((p) => ({ data: p } as Result<Product[]>)),
    tap((p) => console.log(JSON.stringify(p))),
    shareReplay(1),
    catchError((err) =>
      of({
        data: undefined,
        error: this.httpErrorService.formatError(err),
      } as Result<Product[]>)
    )
  );
  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });

  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  // products = computed(() => {
  //   try {
  //    return toSignal(this.products$, { initialValue: [] as Product[] })();
  //   } catch (error) {
  //     // console.log(error);
  //     return [] as Product[];
  //   }
  // });

  private productResult$ = toObservable(this.selectedProductId).pipe(
    filter((id) => id != undefined),
    switchMap((id) => {
      return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
        tap(() => console.log('Product retrieved by id', id)),
        switchMap((product: Product) => this.getProductsWithReviews(product)),
        tap((x) => console.log(x)),
        catchError((err) =>
          of({
            data: undefined,
            error: this.httpErrorService.formatError(err),
          } as Result<Product>)
        )
      );
    }),
    map((p) => ({ data: p } as Result<Product>))
  );

  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error);

  // product$ = combineLatest([this.productSelected$, this.products$]).pipe(
  //   map(([selectedId, products]) =>
  //     products.find((product: Product) => product.id === selectedId)
  //   ),
  //   filter((id) => id != undefined),
  //   tap((x) => console.log(x)),
  //   switchMap((product: Product) => this.getProductsWithReviews(product)),
  //   catchError((err) => this.handleError(err))
  // );

  productSelected(productId: number): void {
    this.selectedProductId.set(productId);
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
