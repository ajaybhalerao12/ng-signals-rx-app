import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
 // Just enough here for the template to compile
 @Input() productId: number = 0;
 errorMessage = '';

 // Product to display
 product: Product | null = null;

 // Set the page title
 pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

 addToCart(product: Product) {
 }
}
