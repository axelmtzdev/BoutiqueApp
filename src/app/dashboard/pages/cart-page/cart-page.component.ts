import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DashboardService } from '../../services/dashboard.service';
import { Product } from '../../interfaces/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment, ProductToSale, Sales } from '../../interfaces/sale.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{

  public client: Client[] = []
  public productsInCart: Product[] = []
  public totalPrice:number = 0

  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  public clientsSignal = this.dashboardService.clientsSignal;

  public formBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.productsInCart =  this.dashboardService.getCart()
    this.totalPrice = this.productsInCart.reduce((total, product) => total + product.priceSale, 0)
  }


  public saleForm:FormGroup = this.formBuilder.group({
    clientId: [Validators.required],

  })


  onConfirmSale() {
    // Obtener el clientId desde el formulario
    const client = this.saleForm.value.clientId;

    const quantity = 1;

    // Mapear los productos del carrito al formato ProductToSale[]
    const products: ProductToSale[] = this.productsInCart.map((product:any) => {
      return {
        productId: product._id, // Asignar el ID del producto
        quantity,               // Asignar la cantidad fija
      };
    });

    const payments: Payment[] = [

    ];



    // Crear el objeto de la venta conforme a la interfaz Sales
    const saleData: Sales = {
      client,
      payments,
      products,
    };

    console.log({saleData});

    this.dashboardService.addSale(saleData)
    .subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Venta realizada!',
          showConfirmButton: false,
          timer: 1500
        });
        this.dashboardService.clearCart()
        this.productsInCart = []
        this.router.navigateByUrl('dashboard/sales-list')
      },
      error: (error) => {
        Swal.fire('Oops...', error, 'error');
        console.log({error});
      }
    })



  }


}
