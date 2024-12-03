import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'client-info',
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css'
})
export class ClientInfoComponent implements OnInit{


  private dashboardService = inject(DashboardService);
  private router = inject(Router);



  ngOnInit(): void {
    if(!this.clients) throw new Error('Method not implemented.');

  }


  @Input()
  public clients!: Client;

  public swalWithBootstrapButtons = Swal.mixin({
    customClass: {

    },
    buttonsStyling: false
  });


  onDeleteClient(id: string | undefined) {
    // Mostrar el diálogo de confirmación
    this.swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `
      <button class="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 mx-1">
        Sí, eliminar
      </button>
    `,
    cancelButtonText: `
      <button class="bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 mx-1">
        No, cancelar
      </button>
    `,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, proceder con la eliminación
        this.dashboardService.deleteClient(id!).subscribe({
          next: () => {
            this.swalWithBootstrapButtons.fire({
              title: "¡Eliminado!",
              text: "El cliente ha sido eliminado con éxito.",
              icon: "success",
              showConfirmButton: false,
              timer: 1000

            });
          },
          error: (error: string) => {
            // Manejar error durante la eliminación
            this.swalWithBootstrapButtons.fire({
              title: "Error",
              text: `Ocurrió un error al eliminar: ${error}`,
              icon: "error",
              showConfirmButton: false,
              timer: 1000

            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Si se cancela la acción
        this.swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El cliente está a salvo :)",
          icon: "error",
          showConfirmButton: false,
          timer: 1000

        });
      }
    });
  }

}
