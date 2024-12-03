import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { DetalleVentaComponent } from './pages/detalle-venta/detalle-venta.component';

export const routes: Routes = [
  {
    path:'',
    component: DashboardLayoutComponent,
    children:[
      {path:'new-product', title: 'Agregar Producto', component: NewProductPageComponent},
      {path:'cart-list', title: 'Carrito de Compras', component: CartPageComponent},
      {path:'clients-module', title: 'Clientes', component: ClientsPageComponent},
      {path:'detalle-venta/:name', title: 'Detalle de venta', component: DetalleVentaComponent},
      {path:'product-list', title: 'Lista de Productos', component: ProductsPageComponent},
      {path:'sales-list', title: 'Ventas', component: SalesPageComponent},
      {path:'', redirectTo:'product-list', pathMatch:'full'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
