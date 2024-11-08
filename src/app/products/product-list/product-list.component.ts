import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage = '';

  private productService = inject(ProductService);

  // selectedProductId: number = 0;
  selectedProduct$ = this.productService.productSelected$;

  // readonly products$ = this.productService.products$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );
  products = this.productService.products

  onSelected(productId: number): void {
    // this.selectedProductId = productId;
    this.productService.productSelected(productId);
  }
}
