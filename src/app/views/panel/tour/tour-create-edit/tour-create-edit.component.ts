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

import { environment } from 'src/environments/environment';
import { DestinoService } from 'src/app/services/destino/destino.service';
import { TourService } from 'src/app/services/tour/tour.service';
import { EtiquetaService } from 'src/app/services/etiqueta/etiqueta.service';

import {MatRadioModule} from '@angular/material/radio'; 

@Component({
  selector: 'app-tour-create-edit',
  templateUrl: './tour-create-edit.component.html',
  styleUrls: ['./tour-create-edit.component.css']
})
export class TourCreateEditComponent implements OnInit {

  
  private baseURL = environment['api'].apiUrl;

  f_fija = true;

  // variable para subir archivos
  filepdf: any = {
    link: []
  };
  progresspdf = 0;
  pdf: File[] = [];
  pdfSinGuardar: any[] = [];

  // variable para subir foto
  filefoto: any = {
    link: []
  };
  progressfoto = 0;
  foto: File[] = [];
  fotoSinGuardar: any[] = [];


  tourForm: FormGroup;
  tourId = 0;
  // bandera para ver si esta editando o registrando
  editing  = false;

  activo = [ {id: 0, activo: 'No'}, {id: 1, activo: 'Si'} ];

  estado = [ {id: 0, nombre: 'Por Iniciar'}, {id: 1, nombre: 'En Progreso'}, {id: 1, nombre: 'Finalizado'} ];

  constructor(
    private formBuilder: FormBuilder,
    private destinoService: DestinoService,
    private tourService: TourService,
    private etiquetaService: EtiquetaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.onInitForm();
    this.selectDestinos();
    this.selectEtiquetas();
    this.tourId = this.route.snapshot.params['id'];
    if (this.tourId) {
      this.editing = true;
      const editingTxt = document.getElementById('txtTitulo');
      editingTxt.innerText = 'Actualizar datos';
      this.editingTour(this.tourId);
    } else {
      this.editing = false;
    }
  }

  onInitForm() {
    this.tourForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      inicio: [null],
      final: [null],
      duracion: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      pdf: ['', Validators.compose([Validators.required])],
      fecha_fija: [null],
      cantidad: [0, Validators.compose([Validators.required])],
      idioma: ['', Validators.compose([Validators.required])],
      activo: [Boolean, Validators.compose([Validators.required])],
      destino_id: 0,
      descripcion: ['', Validators.compose([Validators.required])],
      foto: ['', Validators.compose([Validators.required])],
      etiqueta_id: 0
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

  SubirPDFModal() {
    this.filepdf.link = [];
  }

  SubirFotoModal() {
    this.filefoto.link = [];
  }

  archivoDescripcion(i) {
    const descripcion = $(`textarea#descripcion${i}`).val();
    this.filepdf.link[i].descripcion = descripcion;
  }


  onFilesAddedPDF(files: File[], dropzone) {
    files.forEach(file => {
      let ext: string;
      const objeto = {
        base_64: '',
        extension: '',
        nombre: '',
        nombreAA: 'nuevo'
      };
      let base64string = '';
      this.progresspdf = 0;
      const reader = new FileReader();
      reader.onload = (readerEvt: any) => {
        this.progresspdf = Math.round((100 * readerEvt.loaded) / readerEvt.total);
        const binaryString = readerEvt.target.result;
        base64string = btoa(binaryString);
        objeto.base_64 = base64string;

      };
      reader.readAsBinaryString(file);
      ext = file.name.substring(file.name.indexOf('.'), file.name.length);

      objeto.extension = ext;
      objeto.nombre = file.name;

      this.pdfSinGuardar.push(objeto);
    });

    dropzone.reset();
  }

  onFilesAddedFoto(files: File[], dropzone) {

    files.forEach(file => {
      let ext: string;
      const objeto = {
        base_64: '',
        extension: '',
        nombre: '',
        nombreAA: 'nuevo'
      };
      let base64string = '';
      this.progressfoto = 0;
      const reader = new FileReader();
      reader.onload = (readerEvt: any) => {
        this.progressfoto = Math.round((100 * readerEvt.loaded) / readerEvt.total);
        const binaryString = readerEvt.target.result;
        base64string = btoa(binaryString);
        objeto.base_64 = base64string;

      };
      reader.readAsBinaryString(file);
      ext = file.name.substring(file.name.indexOf('.'), file.name.length);

      objeto.extension = ext;
      objeto.nombre = file.name;

      this.fotoSinGuardar.push(objeto);
    });

    dropzone.reset();
  }


  guardarFoto() {
    this.foto = this.fotoSinGuardar;
    this.tourForm.get('foto').setValue(this.foto);
  }
  guardarPdf() {
    this.pdf = this.pdfSinGuardar;
    this.tourForm.get('pdf').setValue(this.pdf);
  }

  // funcion para cancelar el envio de archivo
  removePdf(index) {
    this.pdfSinGuardar.splice(index, 1);
  }

  cancelarPdf() {
    this.pdfSinGuardar = [];
  }

  removeFoto(index) {
    this.fotoSinGuardar.splice(index, 1);
  }

  cancelarFoto() {
    this.fotoSinGuardar = [];
  }

  editingTour(tour_id) {
    this.tourService.getTour(tour_id).subscribe((respuesta) => {
    console.log(respuesta)
    this.tourForm.get('nombre').setValue(respuesta.tour.nombre);
    this.tourForm.get('inicio').setValue(respuesta.tour.inicio);
    this.tourForm.get('final').setValue(respuesta.tour.final);
    this.tourForm.get('duracion').setValue(respuesta.tour.duracion);
    this.tourForm.get('codigo').setValue(respuesta.tour.codigo);
    this.tourForm.get('estado').setValue(respuesta.tour.estado);

    const pdf = respuesta.tour.pdf;
    if (  pdf !== null && pdf) {
        // AA= nombre Actual Almacenado

        const objeto = {
          base_64: '',
          extension: '',
          nombre: '',
          nombreAA: ''
        };
        objeto.nombre = 'PDF almacenado ' + (1);
        objeto.nombreAA = pdf;
        console.log(objeto)
        this.pdfSinGuardar.push(objeto);

        this.progresspdf = 100;
        this.guardarPdf();
      }
    
    this.tourForm.get('fecha_fija').setValue(respuesta.tour.fecha_fija);
    this.tourForm.get('cantidad').setValue(respuesta.tour.cantidad);
    this.tourForm.get('idioma').setValue(respuesta.tour.idioma);
    this.tourForm.get('activo').setValue(respuesta.tour.activo);

    this.tourForm.get('descripcion').setValue(respuesta.tour.descripcion);

    const foto = respuesta.tour.pdf;

    if (foto !== null && foto) {
        // AA= nombre Actual Almacenado

        const objeto = {
          base_64: '',
          extension: '',
          nombre: '',
          nombreAA: ''
        };
        objeto.nombre = 'Foto almacenado ' + (1);
        objeto.nombreAA = foto;
        this.fotoSinGuardar.push(objeto);

        this.progressfoto = 100;
        this.guardarFoto();
      }


    const data = {
        id: respuesta.destino.id,
        text: respuesta.destino.nombre
    };
    const newOption = new Option(data.text, data.id, false, false);

    $('#selectDestino').append(newOption).trigger('change');
    this.tourForm.get('destino_id').setValue(respuesta.tour.destino_id);


    const tags = {};
    const etiquetas = respuesta.etiquetas;
    etiquetas.map((etiqueta, b) => {
      const x = (b + 1).toString();
      tags[x] = etiqueta.nombre;
    });
    $('#selectEtiqueta').html(this.convertirObjetoASelectOpcions(tags)).trigger('change');
    this.tourForm.get('etiqueta_id').setValue(respuesta.etiquetas);

    });
  }

  createditTour() {
    if (this.editing) {
       this.actualizarTour();
    } else {
      this.registrarNuevoTour();
    }
  }

  registrarNuevoTour() {
    const destino = $('#selectDestino').val();
    this.tourForm.get('destino_id').setValue(destino);

    const etiquetas = $("select[name='Etiqueta[]']").map(function() {
      return $(this).val().valueOf();
    }).toArray();

    if (this.tourForm.invalid) {
      return 0;
    }

    this.tourService.createTour(this.tourForm.value).subscribe((respuesta) => {
      console.log(respuesta)
      if (respuesta.respuesta !== 'Ese tour ya existe') {
        if (etiquetas.length) {
          const objeto = {
            etiqueta_id: etiquetas,
            tour_id: Number(respuesta.respuesta)
          };

          console.log(objeto)
          this.etiquetaService.createEtiquetaTour(objeto).subscribe((respuestaFinal: any) => {
            console.log(respuestaFinal)
            if (respuestaFinal.respuesta) {
              Swal.fire(
                'Almacenamiento!',
                'Exitoso.',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/panel/tour']);
              }, 1000);
             }

          }, (error) => {
              console.log(error);
          });
        }
      } else {
        Swal.fire(
          'Almacenamiento!',
          'Ese tour ya existe.',
          'error'
        );
      }
    });

  }

  actualizarTour() {
    const destino = $('#selectDestino').val();
    this.tourForm.get('destino_id').setValue(destino);

    const etiquetas = $("select[name='Etiqueta[]']").map(function() {
      return $(this).val().valueOf();
    }).toArray();
    console.log(this.tourForm.value);
    console.log(etiquetas);

    if (this.tourForm.invalid) {
      return 0;
    }
    this.tourService.editTour(this.tourId, this.tourForm.value).subscribe((respuesta) => {
      if (respuesta.respuesta) {
        if (etiquetas.length) {
          const objeto = {
            etiqueta_id: etiquetas,
            tour_id: Number(this.tourId)
          };

          console.log(objeto)
          this.etiquetaService.createEtiquetaTour(objeto).subscribe((respuestaFinal: any) => {
            console.log(respuestaFinal)
            if (respuestaFinal.respuesta) {
              Swal.fire(
                'Actualizacion!',
                'Exitoso.',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/panel/tour']);
              }, 1000);
             }

          }, (error) => {
              console.log(error);
          });
        }
      }
   });
  }

  selectDestinos() {
    $(document).ready(() => {
      const fullUrl = `${this.baseURL}destino`;
      $('#selectDestino').select2({
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
              results: data.data.map( (item) => {
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
        multiple: false
      });
    });
  }


  selectEtiquetas() {
    $(document).ready(() => {
      const fullUrl = `${this.baseURL}etiqueta`;
      $('#selectEtiqueta').select2({
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
              results: data.data.map( (item) => {
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
        placeholder: 'Etiqueta',
        minimumInputLength: 0,
        multiple: true
      });
    });
  }

}
