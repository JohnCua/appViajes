import {Component, OnInit, NgZone} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

import { DestinoService } from 'src/app/services/destino/destino.service';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app//services/categoria/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-categoria-index',
  templateUrl: './categoria-index.component.html',
  styleUrls: ['./categoria-index.component.css']
})
export class CategoriaIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'opciones'];

  destinos: any = [];

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

  categoriaForm: FormGroup;

  editing = false;
  categoria_id: number;

  detalleCategoria: any;


  constructor(
    private destinoService: DestinoService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone) {

  }

  ngOnInit() {
    this.getCategorias();
    this.onInitForm();
  }

  // Parametro: BUsqueda es un termino para buscar
  // Parametro: Reset si hay que volver a la primera pagina
  getCategorias(busqueda ?: any, reset ?: boolean) {
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

    this.categoriaService.getCategorias(filtro).subscribe(
      (datos: any) => {
        this.destinos = new MatTableDataSource < any > (datos.data);
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
      this.getCategorias({
        nombre: this.filterQuery
      });
    } else {
      this.getCategorias();
    }
  }

  onInitForm() {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
    });
  }

  getDetalleCategoria(categoria_id) {
    this.categoriaService.getCategoria(categoria_id).subscribe((data) => {
      this.detalleCategoria = data;
    });
  }

  editignCategoria(categoria_id) {
    this.categoria_id = categoria_id;
    this.categoriaService.getCategoria(categoria_id).subscribe((data) => {
      this.categoriaForm.get('nombre').setValue(data.categoria.nombre);
      this.categoriaForm.get('descripcion').setValue(data.categoria.descripcion);
      this.editing = true;
    });
  }



  guardarCategoria() {
    if (this.editing) {
      this.actualizarCategoria();
   } else {
     this.createCategoria();
   }
  }

  createCategoria() {
    if (this.categoriaForm.invalid) {
      return 0;
    }
    this.categoriaService.createCategoria(this.categoriaForm.value).subscribe((respuesta) => {
      if (respuesta.respuesta) {
        this.getCategorias();
        $('#createCategoria').trigger('click');
        Swal.fire(
          'Almacenamiento!',
          'Exitoso.',
          'success'
        );
      } else {
        Swal.fire(
          'Almacenamiento!',
          'Ese tour ya existe.',
          'error'
        );
      }
    });
  }

  actualizarCategoria() {

    if (this.categoriaForm.invalid) {
      return 0;
    }
    this.categoriaService.updateCategoria(this.categoria_id, this.categoriaForm.value).subscribe((respuesta) => {
      if (respuesta.respuesta) {
        this.getCategorias();
        $('#createCategoria').trigger('click');
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


  eliminarCategoria(categoria_id, indice) {
    const destino = {
      id: categoria_id
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
        this.categoriaService.deleteCategoria(categoria_id).subscribe((respuesta) => {
          if (respuesta.success) {
            // this.ngZone.run(()=>{
            //  this.destinos.data.splice(indice,1);
            //   });
            this.getCategorias();
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
