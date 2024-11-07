import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { CartItem } from '../cart';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input({ required: true }) set cartItem(ci:CartItem){
    this.item.set(ci);
  }

  item =signal<CartItem>(undefined!);

  private cartSvc = inject(CartService);

  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  qtyArr = [...Array(8).keys()].map((x) => x + 1);

  // Calculate the extended price
  // exPrice = this.item()?.quantity * this.item()?.product.price;
  exPrice = computed(() => this.item().quantity * this.item().product.price);

  onQuantitySelected(quantity: number): void {
    this.cartSvc.updateQuantity(this.item(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartSvc.removeFromCart(this.item());
  }
}
