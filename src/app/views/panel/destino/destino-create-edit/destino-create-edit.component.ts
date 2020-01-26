import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoService } from 'src/app/services/destino/destino.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-destino-create-edit',
  templateUrl: './destino-create-edit.component.html',
  styleUrls: ['./destino-create-edit.component.css']
})
export class DestinoCreateEditComponent implements OnInit {

  //variable para subir archivos
  files:any={link: []};
  progress = 0;

  galeria: File[]=[];
  filesSinGuardar: File[]=[];

  destinoForm:FormGroup;
  paises:any=[];
  lugares:any=[];
  imagenes:any=["manzana","materia"];
  jsonImagenes:string='';


 

  constructor(private formBuilder:FormBuilder, private destinoService:DestinoService) {
    this.paises = [{id:1, nombre:'Guatemala'}];
   }



  ngOnInit() {
    this.onInitForm();
   // this.selectPais();
  }

  onInitForm(){
    this.destinoForm=this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      encabezado: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      galeria: ['', Validators.compose([Validators.required])],
      highlights: ['', Validators.compose([Validators.required])],
      mas: ['', Validators.compose([Validators.required])],
      lugar_id: [0, Validators.compose([Validators.required])],
      pais_id: [0]
    });
  }

 
  selectPais() {

    this.destinoForm.get('pais_id').valueChanges.subscribe((paisSeleccionado)=>{
      //Filtros del caso
     var filter = {
      pais_id: parseInt(paisSeleccionado)
    }

    this.destinoService.getLugaresSelect(filter).subscribe((respuesta)=>{
         this.lugares=respuesta.data;
       });
     
    });
  }



  SubirArchivosModal(){
    this.files.link=[];
   }

  
   archivoDescripcion(i){
    let descripcion=$(`textarea#descripcion${i}`).val();
    this.files.link[i].descripcion=descripcion;
  }

  onFilesAdded(files: File[], dropzone) {
    files.map((file:any)=>{

      this.progress=0;
      var reader = new FileReader();
      reader.onload=(readerEvt:any)=> {
        this.progress = Math.round((100 * readerEvt.loaded) / readerEvt.total);
        var binaryString = readerEvt.target.result;
    };
    reader.readAsBinaryString(file);
     

      this.filesSinGuardar.push(file);
     
    });

    dropzone.reset();
  }

  GuardarArchivos(){
   this.galeria=this.filesSinGuardar;
   this.destinoForm.get('galeria').setValue(this.galeria);
   console.log(this.filesSinGuardar);
  }

  registrarDestino(){
    
    this.destinoForm.get('lugar_id').setValue(parseInt(this.destinoForm.get('lugar_id').value))
    this.destinoService.createDestino(this.destinoForm.value).subscribe((respuesta)=>{
      console.log(respuesta);
    }, (error)=>{
      console.log(error);
    });

  }

  //funcion para cancelar el envio de archivo
  removeFile(index){
    this.filesSinGuardar.splice(index,1); 
  }

  cancelarArchivos(){
    this.filesSinGuardar=[];
    
  }

}
