import { Component, OnInit, NgZone } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import { DestinoService } from 'src/app/services/destino/destino.service';
import { TourService } from 'src/app/services/tour/tour.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  baseURLImagen = environment['apiImagen'].apiUrlImagen;

  // tour
  tours: any = [];
  detalleTour: any;
  // destino
  detalle: any;
  destinos: any = [];
    // Paginacion
    public currentPage = 1;
    public length = 0;
    public pageSize = 5;
    public sortBy = 'id';
    public sortOrder = 'asc';


  constructor(
    private destinoService: DestinoService,
    private tourService: TourService,
    private ngZone: NgZone
     ) { }

  ngOnInit() {
    this.getTours();
    this.getDestinos();
  }

    // Parametro: BUsqueda es un termino para buscar
  // Parametro: Reset si hay que volver a la primera pagina
  getDestinos(busqueda ?: any, reset ?: boolean) {
    // Guardamos la pagina actual
    let page = this.currentPage;

    // Si debemos volver a la primer pagina
    if (reset) {
      page = 1;
    }

    // Filtros del destino
    const filtro = {
      many: 5,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    };

    this.destinoService.getDestinos(filtro).subscribe(
      (datos: any) => {
       this.destinos = datos.data;
      });
  }

  getTours(busqueda ?: any, reset ?: boolean) {
    // Guardamos la pagina actual
    let page = this.currentPage;

    // Si debemos volver a la primer pagina
    if (reset) {
      page = 1;
    }

    // Filtros del destino
    const filtro = {
      many: 5,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    };

    this.tourService.getTours(filtro).subscribe(
      (datos: any) => {
       this.tours = datos.data;
      });
  }

  verDetalleDestino(destiono_id: any) {
    delete this.detalle;
    this.destinoService.getDestino(destiono_id).subscribe((data: any) => {
      this.detalle = data.destino;
      const galeria = JSON.parse(this.detalle.galeria);
      this.detalle.galeria = [];

      galeria.map((img) => {
        this.detalle.galeria.push(img);
      });

    });
  }

  verDetalleTour(tour_id){
    this.tourService.getTour(tour_id).subscribe((data: any) => {
      this.detalleTour = data.tour;
    });
  }


}
