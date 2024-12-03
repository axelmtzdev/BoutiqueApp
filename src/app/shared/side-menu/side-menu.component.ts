import { Component, computed, inject } from '@angular/core';
import { routes } from '../../dashboard/dashboard-routing.module';
import { AuthService } from '../../auth/services/auth.service';
import { MenuServiceService } from '../../menuService.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .filter((route) => route && route.path)
  .filter((route) => !route.path?.includes(':'))

  private authService = inject(AuthService);
  public menuService = inject(MenuServiceService);
  public user = computed(() => this.authService.currentUser());

  onLogout(){
    this.authService.logout();
  }
}
