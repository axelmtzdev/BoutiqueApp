import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrl: './new-product-page.component.css'
})
export class NewProductPageComponent {
  public formBuilder = inject(FormBuilder);
  public dashboardService = inject(DashboardService)
  private router = inject(Router);


  public productForm:FormGroup = this.formBuilder.group({
    name:     ['', [Validators.required]],
    brand:    ['', [Validators.required]],
    priceBuy: [, [Validators.required,Validators.min(0)]],
    priceSale:[, [Validators.required, Validators.min(0)]],
    size:     ['', [Validators.required, Validators.min(1)]],
    stock:    [, [Validators.required]],
    imageUrl: ['', [Validators.required]],
  });



  addNewProduct() {
    if (this.productForm.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
      return;
    }

    const productData = { ...this.productForm.value };

    // Llama al servicio para agregar el producto
    this.dashboardService.addProduct(productData)
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/dashboard/product-list');
        },
        error: (error) => {
          Swal.fire('Oops...', error, 'error');
        }
      });
  }





}
