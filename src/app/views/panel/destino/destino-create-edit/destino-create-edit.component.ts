import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
});


import { DestinoService } from 'src/app/services/destino/destino.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-destino-create-edit',
  templateUrl: './destino-create-edit.component.html',
  styleUrls: ['./destino-create-edit.component.css']
})
export class DestinoCreateEditComponent implements OnInit {

  private baseURL = environment['api'].apiUrl;

  // variable para subir archivos
  files: any = {
    link: []
  };
  progress = 0;

  galeria: File[] = [];
  filesSinGuardar: any[] = [];

  destinoForm: FormGroup;
  destino_id = 0 ;
  paises: any = [];
  lugares: any = [];
  jsonImagenes = '';

  // bandera para ver si esta editando o registrando
  editing  = false;

  categorias: any = [];
  dataUrl = 'categoria';

  constructor(
    private formBuilder: FormBuilder,
    private destinoService: DestinoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paises = [{
      id: 1,
      nombre: 'Guatemala'
    }];
  }


  ngOnInit() {
    this.onInitForm();
    this.selectCategorias();
    this.destino_id = this.route.snapshot.params['id'];
    if (this.destino_id) {
      this.editing = true;
      const editingTxt = document.getElementById('txtTitulo');
      editingTxt.innerText = 'Actualizar datos';
      this.editingDestino(this.destino_id);
    } else {
      this.editing = false;
    }
  }

  onInitForm() {
    this.destinoForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      encabezado: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      galeria: ['', Validators.compose([Validators.required])],
      highlights: ['', Validators.compose([Validators.required])],
      mas: ['', Validators.compose([Validators.required])],
      lugar_id: [0, Validators.compose([Validators.required])],
      pais_id: [0],
      categoria_id: 0,
    });
  }

  selectPais() {
    this.destinoForm.get('pais_id').valueChanges.subscribe((paisSeleccionado) => {
      // Filtros del caso
      const filter = {
        pais_id: Number(paisSeleccionado)
      };
      this.destinoService.getLugaresSelect(filter).subscribe((respuesta) => {
        this.lugares = respuesta.data;
      });
    });
  }

  SubirArchivosModal() {
    this.files.link = [];
  }

  archivoDescripcion(i) {
    const descripcion = $(`textarea#descripcion${i}`).val();
    this.files.link[i].descripcion = descripcion;
  }

  onFilesAdded(files: File[], dropzone) {
    files.forEach(file => {
      let ext: string;
      const objeto = {
        base_64: '',
        extension: '',
        nombre: '',
        nombreAA: 'nuevo'
      };
      let base64string = '';
      this.progress = 0;
      const reader = new FileReader();
      reader.onload = (readerEvt: any) => {
        this.progress = Math.round((100 * readerEvt.loaded) / readerEvt.total);
        const binaryString = readerEvt.target.result;
        base64string = btoa(binaryString);
        objeto.base_64 = base64string;

      };
      reader.readAsBinaryString(file);
      ext = file.name.substring(file.name.indexOf('.'), file.name.length);

      objeto.extension = ext;
      objeto.nombre = file.name;

      this.filesSinGuardar.push(objeto);
    });
    dropzone.reset();
  }

  guardarArchivos() {
    this.galeria = this.filesSinGuardar;
    this.destinoForm.get('galeria').setValue(this.galeria);
  }

  // funcion para cancelar el envio de archivo
  removeFile(index) {
    this.filesSinGuardar.splice(index, 1);
  }

  cancelarArchivos() {
    this.filesSinGuardar = [];
  }

  editingDestino(destino_id) {
    this.destinoService.getDestino(destino_id).subscribe((respuesta) => {
      this.destinoForm.get('nombre').setValue(respuesta.destino.nombre);
      this.destinoForm.get('encabezado').setValue(respuesta.destino.encabezado);
      this.destinoForm.get('descripcion').setValue(respuesta.destino.descripcion);
      this.destinoForm.get('galeria').setValue(respuesta.destino.galeria);

      const galeria: [] = JSON.parse(respuesta.destino.galeria);
      console.log(galeria)
      if (galeria !== null && galeria.length) {
        // AA= nombre Actual Almacenado

        galeria.map((img, index) => {
          const objeto = {
            base_64: '',
            extension: '',
            nombre: '',
            nombreAA: ''
          };
          objeto.nombre = 'galeria almacenado ' + (index + 1);
          objeto.nombreAA = img;
          this.filesSinGuardar.push(objeto);
        });
        this.progress = 100;
        this.guardarArchivos();

      }

      this.destinoForm.get('highlights').setValue(respuesta.destino.highlights);
      this.destinoForm.get('mas').setValue(respuesta.destino.mas);
      this.selectPais();
      this.destinoForm.get('pais_id').setValue(1);

      this.destinoForm.get('lugar_id').setValue(respuesta.destino.lugar_id);

      const tags = {};
      const categorias = respuesta.categorias;
      categorias.map((categoria, b) => {
        const x = (b + 1).toString();
        tags[x] = categoria.nombre;
      });
      $('#selectCategoria').html(this.convertirObjetoASelectOpcions(tags)).trigger('change');
      this.destinoForm.get('categoria_id').setValue(respuesta.categorias);

    });
  }

  convertirObjetoASelectOpcions(objetos) {
    let htmlTags = '';
    // tslint:disable-next-line: forin
    for (let tag in objetos) {
      htmlTags += '<option value="' + tag + '"selected="selected">' + objetos[tag] + '</option>';
    }
    return htmlTags;
  }

  createditDestino() {
    if (this.editing) {
      this.actualizarDestino();
    } else {
      this.registrarDestino();
    }
  }

  registrarDestino() {
    const categorias = $("select[name='Categoria[]']").map( function() {
      return $(this).val().valueOf();
    }).toArray();

    this.destinoForm.get('lugar_id').setValue(Number(this.destinoForm.get('lugar_id').value));

    if (this.destinoForm.invalid) {
      return 0;
    }
    console.log(this.destinoForm.value)
    this.destinoService.createDestino(this.destinoForm.value).subscribe((respuesta) => {
      if (respuesta.id) {
        if (categorias.length) {
          const objeto = {
            categoria_id: categorias,
            destino_id: Number(respuesta.id)
          };
          this.categoriaService.createCategoriaDestino(objeto).subscribe((respuestaFinal) => {
            if (respuestaFinal.success) {
              Swal.fire(
                'Almacenamiento!',
                'Exitoso.',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/panel/destino']);
              }, 1000);
            }
          });
        }
      }
    }, (error) => {
      console.log(error);
    });


  }


  actualizarDestino() {
    this.destinoForm.get('lugar_id').setValue(Number(this.destinoForm.get('lugar_id').value));

    const categorias = $("select[name='Categoria[]']").map( function() {
      return $(this).val().valueOf();
    }).toArray();

    if (this.destinoForm.invalid) {
      return 0;
    }
    this.destinoService.updateDestino(this.destino_id, this.destinoForm.value).subscribe((respuesta) => {

      if (respuesta.success) {
        if (categorias.length) {
          const objeto = {
            categoria_id: categorias,
            destino_id: Number(this.destino_id)
          };
          this.categoriaService.createCategoriaDestino(objeto).subscribe((respuestaFinal) => {
            if (respuestaFinal.success) {
              Swal.fire(
                'Actualizacion!',
                'Exitoso.',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/panel/destino']);
              }, 1000);
            }
          });
        }
      }
    }, (error) => {
      console.log(error);
    });

  }


  selectCategorias() {
    $(document).ready(() => {
      const fullUrl = `${this.baseURL}categoria`;
      $('#selectCategoria').select2({
        ajax: {
          headers: {
            'Content-Type': 'application/json',
          },
          url: fullUrl,
          data(params) {
            return {
              nombre: params.term,
              page: params.page || 1
            };

          },
          dataType: 'json',
          processResults(data) {
            data.page = data.page || 1;
            return {
              results: data.data.map((item) =>{
                return {
                  id: item.id,
                  text: item.nombre
                };
              }),
              pagination: {
                more: data.pagination
              }
            };
          },
          cache: true,
          delay: 250
        },
        placeholder: 'Categoria',
        minimumInputLength: 0,
        multiple: true
      });
    });
  }

}
