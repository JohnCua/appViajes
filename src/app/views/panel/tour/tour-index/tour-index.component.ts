import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DestinoService } from 'src/app/services/destino/destino.service';
import Swal from 'sweetalert2';
import { TourService } from 'src/app/services/tour/tour.service';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tour-index',
  templateUrl: './tour-index.component.html',
  styleUrls: ['./tour-index.component.css']
})
export class TourIndexComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'lugar', 'destino', 'fechas', 'cantidad', 'activo', 'opciones'];

  tours: any = [];
  selected_tour: any;

  // Paginacion
  public currentPage = 1;
  public length = 0;
  public pageSize = 5;
  public sortBy = 'id';
  public sortOrder = 'asc';

  // Busqueda
  public filterQuery = '';
  public searchTimeout: any;



  constructor(private tourService: TourService) {
    this.getTours();
  }

  ngOnInit() {}

  getTours(busqueda ?: any, reset ?: boolean) {
    // Guardamos la pagina actual
    let page = this.currentPage;

    // Si debemos volver a la primer pagina
    if (reset) {
      page = 1;
    }

    // Filtros del destino
    const filtro = {
      page: page,
      many: this.pageSize,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    };

    this.tourService.getTours(filtro).subscribe((datos) => {
      this.tours = new MatTableDataSource < any > (datos.data);
      this.length = datos.total;
      if (reset) {
        this.currentPage = 1;
      }
    });
  }

  // Cambio de pagina y de cantidad de elementos por pagina
  cambioPagina(event) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    if (this.filterQuery !== '') {
      this.getTours({
        nombre: this.filterQuery
      });
    } else {
      this.getTours();
    }
  }

  verDetalleTour(tour_id){
    delete this.selected_tour;
    this.tourService.getTour(tour_id).subscribe((data: any) => {
      this.selected_tour = data;
      console.log(this.selected_tour);
    });
  }

  eliminarTour(tour_id, indice) {
    const tour = {
      id: tour_id
    };
    Swal.fire({
      title: 'Esta seguro?',
      text: 'No se podran revertir los cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!!'
    }).then((result) => {
      if (result.value) {
        this.tourService.deleteTour(tour_id).subscribe((respuesta) => {
          if (respuesta.respuesta) {
            // this.ngZone.run(()=>{
            //  this.destinos.data.splice(indice,1);
            //   });
            this.getTours();
            Swal.fire(
              'Eliminado!',
              'Datos eliminado exitoso.',
              'success'
            );

          }
        });
      }
    });
  }

}
