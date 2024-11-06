import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';

  // Products
  products: Product[] = [];
  prouductSub!: Subscription;
  private productService = inject(ProductService);

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  ngOnInit(): void {
    
    this.prouductSub = this.productService
      .getProducts()
      .pipe(
        tap(() => console.log('Products retrieved in component')),
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;})
      )
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });
  }
  ngOnDestroy(): void {
    this.prouductSub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
