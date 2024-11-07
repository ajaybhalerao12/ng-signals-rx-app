import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent{
  errorMessage = '';

  pageTitle = "Product Detail";

  private productSvc = inject(ProductService);

  readonly product$ = this.productSvc.product$
  .pipe(
    tap(() => console.log('Product fetched in component')),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  addToCart(product: Product) {}
}
