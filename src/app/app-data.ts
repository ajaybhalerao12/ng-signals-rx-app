import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ReviewData } from './reviews/review-data';
import { Review } from './reviews/review';
import { Product } from './products/product';
import { ProductData } from './products/product-data.ts';

export class AppData implements InMemoryDbService {

  createDb(): { products: Product[], reviews: Review[]} {
    const products = ProductData.products;
    const reviews = ReviewData.reviews;
    return { products, reviews };
  }
}
