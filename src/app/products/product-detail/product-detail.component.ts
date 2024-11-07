import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent{
  errorMessage = '';

  pageTitle = "Product Detail";

  private productSvc = inject(ProductService);

  private cartSvc= inject(CartService);

  readonly product$ = this.productSvc.product$
  .pipe(
    tap(() => console.log('Product fetched in component')),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  addToCart(product: Product) {
    this.cartSvc.addToCart(product);
  }
}
