import {Component, OnInit,NgZone} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

import { DestinoService } from 'src/app/services/destino/destino.service';
import { environment } from 'src/environments/environment';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-destino-index',
  templateUrl: './destino-index.component.html',
  styleUrls: ['./destino-index.component.css']
})
export class DestinoIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'encabezado', 'lugar','valoracion', 'opciones'];

  destinos:any=[];
  
  baseURLImagen=environment['apiImagen'].apiUrlImagen;
  //Paginacion
  public currentPage = 1;
  public length = 0;
  public pageSize = 5;
  public sortBy = "id";
  public sortOrder = "asc";

  //Busqueda
  public filterQuery = '';
  public searchTimeout : any;

  //detalle del destino
   detalle:any;
   modalDetalle:boolean=false;
  
  constructor(private destinoService:DestinoService, private ngZone:NgZone) { 
    
  }

  ngOnInit() {
    this.getDestinos();
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

  verDetalle(destiono_id){
    delete this.detalle;
    this.destinoService.getDestino(destiono_id).subscribe((data:any)=>{
      this.detalle=data.destino;
      console.log(this.detalle.galeria)
      let galeria=JSON.parse(this.detalle.galeria);
      this.detalle.galeria=[];

      galeria.map((img)=>{
        this.detalle.galeria.push(img)
      })
     
      this.modalDetalle=true;

    })
  }


  eliminarDestino(destino_id,indice){
    let destino =  {
      id:destino_id
    } 
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se podran revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!!'
    }).then((result) => {
      if (result.value) {

        this.destinoService.deleteDestino(destino_id).subscribe((respuesta)=>{
          if(respuesta.success){

           // this.ngZone.run(()=>{
            //  this.destinos.data.splice(indice,1);
          //   });
            this.getDestinos();
          
            Swal.fire(
              'Eliminado!',
              'Datos eliminado exitoso.',
              'success'
            );
          
          }
        })
     
      }
    })

  
  }

}

