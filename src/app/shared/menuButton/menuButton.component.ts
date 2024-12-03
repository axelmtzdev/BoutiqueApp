import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuServiceService } from '../../menuService.service';

@Component({
  selector: 'menu-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './menuButton.component.html',
  styleUrl: './menuButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonComponent {
  public menuService = inject(MenuServiceService)
 }
