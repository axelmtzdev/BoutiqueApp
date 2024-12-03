import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.css'
})
export class ClientsPageComponent implements OnInit{




  private dashboardService = inject(DashboardService);
  public formBuilder = inject(FormBuilder);

  public clientsSignal = this.dashboardService.clientsSignal;
  public searchQuery = signal('');


  ngOnInit(): void {
    this.dashboardService.getClients();
  }

  public clientForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    contact: ['', Validators.required]
  });


  get filteredClients() {
    const query = this.searchQuery().toLowerCase();
    return this.clientsSignal().filter((client) =>
      client.name.toLowerCase().includes(query)
    );
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchQuery.set(target.value);
    }
  }

  addNewClient(){
    if (this.clientForm.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
      return;
    }

    const client = { ...this.clientForm.value };

    this.dashboardService.addClient(client)
    .subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.clientForm.reset();
      },
      error: (error) => {
        Swal.fire('Oops...', error, 'error');
      }
    })
  }

}
