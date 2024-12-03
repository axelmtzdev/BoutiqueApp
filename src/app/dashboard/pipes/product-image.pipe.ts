import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name:'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(product: Product): string {
    if(!product._id && !product.imageUrl){
      return 'assets/no-image.png';
    }
    if(product.imageUrl) return product.imageUrl;

    return `assets/images/${product._id}.webp`;
  }
}
