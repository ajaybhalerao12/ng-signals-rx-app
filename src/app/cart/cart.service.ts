import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  cartCount = computed(()=>this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

   // Total up the extended price for each item
   subTotal = computed(() => this.cartItems().reduce((accTotal, item) =>
    accTotal + (item.quantity * item.product.price), 0));

  // Delivery is free if spending more than $50
  deliveryFee = computed<number>(() => this.subTotal() < 50 ? 5.99 : 0);

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  constructor() { }

  eLength  = effect(()=> console.log('CartService: CartItems length: ', this.cartItems().length));
  addToCart(product:Product){
    this.cartItems.update(items => [...items, {product, quantity: 1}]);
  }
}
