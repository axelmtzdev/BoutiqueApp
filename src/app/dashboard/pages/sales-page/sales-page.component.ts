import { Component, inject, OnInit } from '@angular/core';
import { SaleInfo } from '../../interfaces/info-sale.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrl: './sales-page.component.css'
})
export class SalesPageComponent implements OnInit{

  public sales: SaleInfo[] = []
  private dashboardService = inject(DashboardService)


  ngOnInit(): void {
    this.dashboardService.getSales()
      .subscribe( sale => this.sales = sale)
  }

}
