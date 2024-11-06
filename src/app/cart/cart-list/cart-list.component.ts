import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent,CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  pageTitle = 'Cart';

  cartItems: CartItem[] = [];
}
