import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './utilities/page-not-found/page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const routes: Routes = [
  {path:'welcome', component: HomeComponent,title: 'Home'},
  {path:'', redirectTo: '/welcome', pathMatch: 'full'},
  {
    path: 'products',
    loadComponent: () => import('./products/product-list/product-list.component').then(c => c.ProductListComponent)
  },
  {path:'products',component: ProductListComponent,title: 'Products'},
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart-shell/cart-shell.component').then(c => c.CartShellComponent)
  },
  {path:'**', component: PageNotFoundComponent,title: 'Page Not Found'}
];
