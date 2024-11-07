import { Component, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent,CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  pageTitle = 'Cart';

  private cartSvc = inject(CartService);

  cartItems = this.cartSvc.cartItems;
}
