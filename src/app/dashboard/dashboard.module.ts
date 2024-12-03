import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { CardComponent } from './components/card/card.component';
import { ProductImagePipe } from './pipes/product-image.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { ProductSizePipe } from './pipes/product-size.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { MenuButtonComponent } from "../shared/menuButton/menuButton.component";
import { SaleInfoComponent } from './components/sale-info/sale-info.component';
import { DetalleVentaComponent } from './pages/detalle-venta/detalle-venta.component';
import { SalesClientComponent } from './components/sales-client/sales-client.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';





@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProductsPageComponent,
    ClientsPageComponent,
    SalesPageComponent,
    CardComponent,
    ProductImagePipe,
    ProductSizePipe,
    NewProductPageComponent,
    ClientInfoComponent,
    CartPageComponent,
    ProductCartComponent,
    SaleInfoComponent,
    DetalleVentaComponent,
    SalesClientComponent,





  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuButtonComponent,


],
  exports:[

  ]
})
export class DashboardModule { }
