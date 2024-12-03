import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'productSizePipe'
})
export class ProductSizePipe implements PipeTransform {

  transform(size: string):string {

    const isNumber = !isNaN(Number(size));

    if (isNumber) {
      return `${size} MX`;
    }

    return size;
  }

}
