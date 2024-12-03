import { Component, Input } from '@angular/core';
import { SaleInfo } from '../../interfaces/info-sale.interface';

@Component({
  selector: 'sale-info',
  templateUrl: './sale-info.component.html',
  styleUrl: './sale-info.component.css'
})
export class SaleInfoComponent {

  @Input()
  public saleInfo!:SaleInfo;



}
