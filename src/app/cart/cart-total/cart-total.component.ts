import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css'
})
export class CartTotalComponent {

  private cartSvc = inject(CartService);
  cartItems = this.cartSvc.cartItems;

  subTotal = this.cartSvc.subTotal;
  deliveryFee = this.cartSvc.deliveryFee;
  tax = this.cartSvc.tax;
  totalPrice = this.cartSvc.totalPrice;
}
