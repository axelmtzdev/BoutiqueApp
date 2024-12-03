import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuServiceService } from '../../../menuService.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public product:Product[] = []
  public cartCount: number = 0;
  private subscription!: Subscription;
  private dashboardService = inject(DashboardService)
  private router = inject(Router)



  ngOnInit(): void {


    this.subscription = this.dashboardService.getCartCount().subscribe((count) => {
      this.cartCount = count;
    });

    this.dashboardService.getProducts()
      .subscribe(product => this.product = product)
  }

  updateCartCount() {
    this.cartCount = this.dashboardService.getCart().length;
  }

  goToCartPage(){
    this.router.navigateByUrl('/dashboard/cart-list')
  }

}
