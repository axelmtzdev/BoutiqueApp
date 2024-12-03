import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuardGuard } from './auth/guards/is-not-authenticated-guard.guard';
import { isAuthenticatedGuardGuard } from './auth/guards/is-authenticated-guard.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[isNotAuthenticatedGuardGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'dashboard',
    canActivate:[isAuthenticatedGuardGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
