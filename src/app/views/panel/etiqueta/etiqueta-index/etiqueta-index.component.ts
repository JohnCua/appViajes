import {Component, OnInit, NgZone} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

import { DestinoService } from 'src/app/services/destino/destino.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EtiquetaService } from 'src/app/services/etiqueta/etiqueta.service';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
});


@Component({
  selector: 'app-etiqueta-index',
  templateUrl: './etiqueta-index.component.html',
  styleUrls: ['./etiqueta-index.component.css']
})
export class EtiquetaIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'opciones'];

  etiquetas: any = [];

  private baseURL = environment['api'].apiUrl;
  baseURLImagen = environment['apiImagen'].apiUrlImagen;
  // Paginacion
  public currentPage = 1;
  public length = 0;
  public pageSize = 5;
  public sortBy = 'id';
  public sortOrder = 'asc';

  // Busqueda
  public filterQuery = '';
  public searchTimeout: any;


  // formulario

  etiquetaForm: FormGroup;

  editing = false;
  etiqueta_id: number;

  detalleEtiqueta: any;


  constructor(
    private destinoService: DestinoService,
    private etiquetaService: EtiquetaService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone) {

  }

  ngOnInit() {
    this.getEtiquetas();
    this.onInitForm();
  }

  // Parametro: BUsqueda es un termino para buscar
  // Parametro: Reset si hay que volver a la primera pagina
  getEtiquetas(busqueda ?: any, reset ?: boolean) {
    // Guardamos la pagina actual
    let page = this.currentPage;

    // Si debemos volver a la primer pagina
    if (reset) {
      page = 1;
    }

    // Filtros del destino
    let filtro = {
      page: page,
      many: this.pageSize,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    };

    this.etiquetaService.getEtiquetas(filtro).subscribe(
      (datos: any) => {
        this.etiquetas = new MatTableDataSource < any > (datos.data);
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
      this.getEtiquetas({
        nombre: this.filterQuery
      });
    } else {
      this.getEtiquetas();
    }
  }

  onInitForm() {
    this.etiquetaForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
    });
  }

  getDetalleEtiqueta(etiqueta_id) {
    this.etiquetaService.getEtiqueta(etiqueta_id).subscribe((data) => {
      this.detalleEtiqueta = data;
    });
  }

  editingEtiqueta(etiqueta_id) {
    this.etiqueta_id = etiqueta_id;
    this.etiquetaService.getEtiqueta(etiqueta_id).subscribe((data) => {
      console.log(data)
      this.etiquetaForm.get('nombre').setValue(data.etiqueta.nombre);
      this.etiquetaForm.get('descripcion').setValue(data.etiqueta.descripcion);
      this.editing = true;
    });
  }

  limpiarModal(){
    this.etiquetaForm.get('nombre').setValue('');
    this.etiquetaForm.get('descripcion').setValue('N/A');
  }

  guardarEtiqueta() {
    if (this.editing) {
      this.actualizarEtiqueta();
   } else {
     this.createEtiqueta();
   }
  }

  createEtiqueta() {
    if (this.etiquetaForm.invalid) {
      return 0;
    }
    this.etiquetaService.createEtiqueta(this.etiquetaForm.value).subscribe((respuesta) => {
      if (respuesta.respuesta) {
        this.getEtiquetas();
        $('#createEtiqueta').trigger('click');
        Swal.fire(
          'Almacenamiento!',
          'Exitoso.',
          'success'
        );
      } else {
        Swal.fire(
          'Almacenamiento!',
          'Esa etiqueta ya existe.',
          'error'
        );
      }
    });
  }

  actualizarEtiqueta() {

    if (this.etiquetaForm.invalid) {
      return 0;
    }
    this.etiquetaService.updateEtiqueta(this.etiqueta_id, this.etiquetaForm.value).subscribe((respuesta) => {
      if (respuesta.respuesta) {
        this.getEtiquetas();
        $('#createEtiqueta').trigger('click');
        Swal.fire(
          'Actualizacion!',
          'Exitoso.',
          'success'
        );
        this.editing = false;
      } else {
        Swal.fire(
          'Actualizacion!',
          'Ocurrio un error.',
          'error'
        );
      }
    });
  }


  eliminarEtiqueta(etiqueta_id, indice) {
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
        this.etiquetaService.deleteEtiqueta(etiqueta_id).subscribe((respuesta) => {
          if (respuesta.respuesta) {
            // this.ngZone.run(()=>{
            //  this.destinos.data.splice(indice,1);
            //   });
            this.getEtiquetas();
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
