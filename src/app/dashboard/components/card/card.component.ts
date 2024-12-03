import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'shop-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  ngOnInit(): void {
    if(!this.product) throw new Error('Method not implemented.');
  }

  @Input()
  public product!: Product;

  private dashboardService = inject(DashboardService)

  addToCart(product: Product){
    this.dashboardService.addToCart(product);
  }

}
