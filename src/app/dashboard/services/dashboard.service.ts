import { inject, Injectable, OnInit, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Brand, Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { Sales } from '../interfaces/sale.interface';
import { SaleInfo } from '../interfaces/info-sale.interface';
import { AddPaymentDto } from '../interfaces/active-sale.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private http = inject(HttpClient)

  private baseUrl:string = environment.baseUrl;

  private _marcas:Brand[] = [Brand.Adidas, Brand.Nike, Brand.Puma, Brand.Rebook]

  private _cart:Product[] = [];


  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public clientsSignal = signal<Client[]>([]);
  private salesSignal = signal<SaleInfo[]>([]);
  public totalSaleAmount = signal(0);
  public totalPaymentsAmount = signal(0);


  get sales() {
    return this.salesSignal.asReadonly(); // Exponer la señal como de solo lectura
  }

  get totalSaleAmountInfo(){
    return this.totalSaleAmount.asReadonly()
  }

  get totalPaymentAmountInfo(){
    return this.totalPaymentsAmount.asReadonly()
  }

  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  getCart(): Product[]{
    return this._cart;
  }

  getmarcas():Brand[]{
    return [...this._marcas]
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getSales():Observable<SaleInfo[]> {
    return this.http.get<SaleInfo[]>(`${this.baseUrl}/sales`)
  }

  getInfoClient(clientName: string | null): Observable<SaleInfo[]> {
    return this.http.get<SaleInfo[]>(`${this.baseUrl}/sales/client/${clientName}`);
  }

  updateSales(clientName: string | null): void {
    this.getInfoClient(clientName).subscribe({

      next: (data) =>{
        this.salesSignal.set(data)
        this.calculateTotals()
      },
      error: (err) => console.error(err),
    });
  }

  private calculateTotals(): void {
    const salesData = this.sales(); // Acceder al valor de la señal

    console.log(`Valor de la señal: ${salesData}`)
    // Calcular el total de ventas
    this.totalSaleAmount.set(
      salesData.reduce((sum, sale) => sum + sale.totalAmount, 0)
    );

    // Calcular el total de pagos
    this.totalPaymentsAmount.set(
      salesData.reduce(
        (sum, sale) =>
          sum + sale.payments.reduce((pSum, payment) => pSum + payment.amount, 0),
        0
      )
    );
    }

  addToCart(product: Product){
    if (!this._cart.find((item) => item._id === product._id)) {
      this._cart.push(product);
      this.cartCountSubject.next(this._cart.length); // Emitir el nuevo conteo
    }
  }

  clearCart(): void {
    this._cart = [];
    this.cartCountSubject.next(0);
  }

  getClients(): void {
    this.http.get<Client[]>(`${this.baseUrl}/clients`)
      .subscribe({
        next: (clients) => this.clientsSignal.set(clients),
        error: (err) => console.error('Error al obtener clientes:', err)
      });
  }

  addProduct(product: Product): Observable<boolean> {
    const url = `${this.baseUrl}/products`;

    return this.http.post<Product>(url, product).pipe(
      map((response) => !!response), // Devuelve `true` si hay respuesta
      catchError((err) => throwError(() => err.error.message))
    );
  }





  addClient(client: Client): Observable<boolean> {
    const url = `${this.baseUrl}/clients`;

    return this.http.post<Client>(url, client).pipe(
      map((newClient) => {
        // Actualiza la señal con el nuevo cliente
        this.clientsSignal.update((clients) => [...clients, newClient]);
        return true;
      }),
      catchError((err) => {
        console.error('Error al agregar cliente:', err);
        throw err;
      })
    );
  }
  deleteClient(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/clients/${id}`).pipe(
      map(() => {
        // Filtra la lista para eliminar el cliente con el ID especificado
        this.clientsSignal.update((clients) => clients.filter(client => client._id !== id));
        return true;
      }),
      catchError((err) => {
        console.error('Error al eliminar cliente:', err);
        throw err;
      })
    );
  }


  addSale(saleData: Sales):Observable<boolean>{
    const url = `${this.baseUrl}/sales`;

    return this.http.post<Sales>(url,saleData).pipe(
      map((response) => !!response),
      catchError((err) => throwError(() => err.error.message))
    )
  }



  addPayment(payment: AddPaymentDto): Observable<boolean> {
    const url = `${this.baseUrl}/sales/add-payment`;
    return this.http.patch<AddPaymentDto>(url, payment).pipe(
      map((response) => !!response),
      catchError((err) => throwError(() => err.error.message)),
    );
  }


  constructor() { }


}
