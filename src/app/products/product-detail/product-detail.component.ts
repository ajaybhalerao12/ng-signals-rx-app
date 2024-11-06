import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Subscription, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../../utilities/http-error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  @Input() productId: number = 0;
  errorMessage = '';

  // Product to display
  product: Product | null = null;
  // Set the page title
  pageTitle = this.product
    ? `Product Detail for: ${this.product.productName}`
    : 'Product Detail';

  prouductSub!: Subscription;

  constructor(private productSvc: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    let id = changes['productId'].currentValue;
    if (id) {
      this.prouductSub = this.productSvc
        .getProduct(id)
        .pipe(
          tap(() => console.log('Product fetched in component')),
          catchError((err) => {
            this.errorMessage = err;
            return EMPTY;
          })
        )
        .subscribe((product: Product) => {
            console.log(`Product fetched in component: ${product.productName}`);
            this.product = product;
          }
        );
    }
  }

  ngOnDestroy(): void {
    if (this.prouductSub) {
      this.prouductSub.unsubscribe();
    }
  }

  addToCart(product: Product) {}
}
