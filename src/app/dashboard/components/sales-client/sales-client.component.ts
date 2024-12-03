import {  Component, inject, Input } from '@angular/core';
import { SaleInfo } from '../../interfaces/info-sale.interface';
import { AddPaymentDto } from '../../interfaces/active-sale.interface';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'sales-client',
  templateUrl: './sales-client.component.html',
  styleUrl: './sales-client.component.css'
})
export class SalesClientComponent {

  private formBuilder = inject(FormBuilder);
  private dashboardService = inject(DashboardService)


  @Input()
  public sale!: SaleInfo[]

 @Input()
 public TotalAmount!: number

 @Input()
 public TotalPayment!: number

 //Regresa los pagos a las ventas correspondientes.
 public paysForSale: AddPaymentDto[] = [];

 public myPaymentForm: FormGroup = this.formBuilder.group({
  totalAmountToPay: [0, [Validators.required, Validators.min(0) ]],
  paymentDate: [Date.now, [Validators.required]],
  paymentType: ['', [Validators.required]]
})


validatePay(): void {
  const { totalAmountToPay, paymentDate, paymentType } = this.myPaymentForm.value;
  const payments = this.getPaymentsForSales(this.sale, totalAmountToPay, paymentDate, paymentType);

  payments.forEach((payment) => {

    this.dashboardService.addPayment(payment).subscribe({
      next: () => {
        Swal.fire('Registro exitoso!', '', 'success');
        this.dashboardService.updateSales(this.sale[0].client.name); // Actualizar los datos
      },
      error: (err) => Swal.fire('Oops...', err, 'error'),
    });
  });
}

addPayments(payments: AddPaymentDto[]) {

  payments.forEach((payment) => {
    this.dashboardService.addPayment(payment)
      .subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso!',
            showConfirmButton: false,
            timer: 1500
          });

        },
        error: (error) => {
          Swal.fire('Oops...', error, 'error');
        }
      })
  })

}

getPaymentsForSales(
  sales: SaleInfo[],
  paymentAmount: number,
  paymentDate: Date,
  paymentType: string
): AddPaymentDto[] {
  // Calcular el total de todas las ventas
  const totalSalesAmount = sales.reduce(
    (sum, sale) =>
      sum +
      (sale.totalAmount -
        sale.payments.reduce((pSum, p) => pSum + p.amount, 0)),
    0
  );

  // Validar que el monto no exceda el total
  if (paymentAmount > totalSalesAmount) {
    Swal.fire('Oops...', 'El monto excede el total de las ventas pendientes.', 'error');
    return []; // Retorna vacío si hay un error
  }

  const result: AddPaymentDto[] = []; // Cambiar el tipo de resultado

  let remainingPayment = paymentAmount;

  for (const sale of sales) {
    // Calcular el saldo restante en la venta actual
    const totalPayments = sale.payments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const remainingAmount = sale.totalAmount - totalPayments;

    if (remainingAmount <= 0) continue; // Si está cubierta, pasar a la siguiente

    // Determinar cuánto se puede asignar a esta venta
    const appliedAmount = Math.min(remainingAmount, remainingPayment);

    // Construir el objeto en el formato esperado por el backend
    result.push({
      saleId: sale._id,
      payment: {
        amount: appliedAmount,
        date: paymentDate,
        paymentType: paymentType
      }
    });

    // Reducir el monto restante
    remainingPayment -= appliedAmount;

    // Si ya no queda monto por asignar, terminamos
    if (remainingPayment <= 0) break;
  }



  return result;
}




}
