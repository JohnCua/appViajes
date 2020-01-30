import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DestinoService } from 'src/app/services/destino/destino.service';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-destino-index',
  templateUrl: './destino-index.component.html',
  styleUrls: ['./destino-index.component.css']
})
export class DestinoIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'encabezado', 'lugar','valoracion', 'opciones'];


  destinos:any=[];
  
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //Paginacion
  public currentPage = 1;
  public length = 0;
  public pageSize = 5;
  public sortBy = "id";
  public sortOrder = "asc";

  // MatPaginator Output
  pageEvent: PageEvent;

  
  //Busqueda
  public filterQuery = '';
  public searchTimeout : any;


  constructor(private destinoService:DestinoService) { 
    this.getDestinos();
  }

  ngOnInit() {
    
    this.destinos.paginator = this.paginator;
   
    
  }

  //Parametro: BUsqueda es un termino para buscar
  //Parametro: Reset si hay que volver a la primera pagina
  getDestinos(busqueda? : any, reset? : boolean){
    //Guardamos la pagina actual
    var page = this.currentPage;    
    
    //Si debemos volver a la primer pagina
    if(reset) {
        page = 1;
    }

    //Filtros del destino
    let filtro =  {
      page: page,
      many: this.pageSize,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    }    

    this.destinoService.getDestinos(filtro).subscribe(
      (datos:any)=>{
        this.destinos=new MatTableDataSource<any>(datos.data);
        this.length = datos.total;

        if (reset){
          this.currentPage = 1;
        }
    });
  }

  //Cambio de pagina y de cantidad de elementos por pagina
    cambioPagina(event){
      this.currentPage = event.pageIndex+1;
      this.pageSize = event.pageSize;

      if (this.filterQuery !== '') {
        this.getDestinos({nombre : this.filterQuery});
      }
      else {
        this.getDestinos();
      }
  }

}

