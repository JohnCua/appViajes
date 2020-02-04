import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinoService } from 'src/app/services/destino/destino.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
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
  destino_id:number=0;
  paises:any=[];
  lugares:any=[];
  imagenes:any=["manzana","materia"];
  jsonImagenes:string='';

  //bandera para ver si esta editando o registrando
  editing:boolean=false;


 

  constructor(private formBuilder:FormBuilder, 
    private destinoService:DestinoService,
    private router:Router,
    private route:ActivatedRoute
    ){
    this.paises = [{id:1, nombre:'Guatemala'}];
   }



  ngOnInit() {
    this.onInitForm();
    this.destino_id=this.route.snapshot.params['id'];
   // this.selectPais();
   if(this.destino_id){
     this.editing=true;
     var editingTxt=document.getElementById('txtTitulo');
     editingTxt.innerText="Actualizar datos";
     this.editingDestino(this.destino_id);

   }else{
    this.editing=false;
   }
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

  createditDestino(){
    if(this.editing){
      this.actualizarDestino();
    }else{
      this.registrarDestino();
    }
  }

  registrarDestino(){
    
    this.destinoForm.get('lugar_id').setValue(parseInt(this.destinoForm.get('lugar_id').value))
    this.destinoService.createDestino(this.destinoForm.value).subscribe((respuesta)=>{
      console.log(respuesta);
    }, (error)=>{
      console.log(error);
    });

  }


  actualizarDestino(){
    this.destinoForm.get('lugar_id').setValue(parseInt(this.destinoForm.get('lugar_id').value))
    this.destinoService.updateDestino(this.destino_id,this.destinoForm.value).subscribe((respuesta)=>{
      console.log(respuesta);
    },(error)=>{
      console.log(error);
    })

  }

  editingDestino(destino_id){
    this.destinoService.getDestino(destino_id).subscribe((respuesta)=>{
      this.destinoForm.get('nombre').setValue(respuesta.destino.nombre);
      this.destinoForm.get('encabezado').setValue(respuesta.destino.encabezado);
      this.destinoForm.get('descripcion').setValue(respuesta.destino.descripcion);
      this.destinoForm.get('galeria').setValue(respuesta.destino.galeria);
      respuesta.destino.galeria.map((img)=>{
        this.filesSinGuardar.push(img);
      })

      this.destinoForm.get('highlights').setValue(respuesta.destino.highlights);
      this.destinoForm.get('mas').setValue(respuesta.destino.mas);
      this.selectPais();
      this.destinoForm.get('pais_id').setValue(1);
      this.destinoForm.get('lugar_id').setValue(respuesta.destino.lugar_id);
      
      console.log(respuesta);
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
