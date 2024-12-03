import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((state) => !state);
  }

  openMenu() {
    this.isMenuOpen.set(true);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

}
