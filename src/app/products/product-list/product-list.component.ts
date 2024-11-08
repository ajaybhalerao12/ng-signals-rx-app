import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
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

  private productService = inject(ProductService);


  // selectedProduct$ = this.productService.productSelected$;
  selectedProductId = this.productService.selectedProductId;

  // readonly products$ = this.productService.products$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );
  products = this.productService.products;
  errorMessage = this.productService.productsError;
  e = effect(() => {
    console.log('Error :',this.errorMessage());
  });

  onSelected(productId: number): void {
    // this.selectedProductId = productId;
    this.productService.productSelected(productId);
  }
}
