import { Component } from '@angular/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';

@Component({
  selector: 'app-cart-shell',
  standalone: true,
  imports: [CartListComponent,CartTotalComponent],
  templateUrl: './cart-shell.component.html',
  styleUrl: './cart-shell.component.css'
})
export class CartShellComponent {

}
