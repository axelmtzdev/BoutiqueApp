import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SaleInfo } from '../../interfaces/info-sale.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.css',
})
export class DetalleVentaComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  public result: SaleInfo[] = [];
  public errorMessage: string | null = null;

  private activatedRoute = inject(ActivatedRoute)

  public sales = this.dashboardService.sales; // Usar directamente la señal
  public totalSaleAmount = this.dashboardService.totalSaleAmountInfo
  public totalPaymentsAmount = this.dashboardService.totalPaymentAmountInfo



  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const clientName = params['name'];
      this.dashboardService.updateSales(clientName); // Actualizar las ventas
    });
  }


}

