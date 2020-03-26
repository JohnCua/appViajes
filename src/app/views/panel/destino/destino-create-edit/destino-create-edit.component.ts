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

  //variable para subir archivos
  files:any={link: []};
  progress = 0;

  galeria: File[]=[];
  filesSinGuardar: any[]=[];

  destinoForm:FormGroup;
  destino_id:number=0;
  paises:any=[];
  lugares:any=[];
  imagenes:any=["manzana","materia"];
  jsonImagenes:string='';

  //bandera para ver si esta editando o registrando
  editing:boolean=false;

  categorias:any=[];
  dataUrl='categoria';

  constructor(private formBuilder:FormBuilder, 
    private destinoService:DestinoService,
    private categoriaService:CategoriaService,
    private router:Router,
    private route:ActivatedRoute
    ){
    this.paises = [{id:1, nombre:'Guatemala'}];
   }



  ngOnInit() {
    this.onInitForm();
    this.selectCategorias();

    this.destino_id=this.route.snapshot.params['id'];

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
      pais_id: [0],
      categoria_id: 0,
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
    
    files.forEach(file => {
      var ext:string;
      let objeto={base_64: '', extension: '',nombre: ""};
      var base64string='';
      this.progress=0;
      var reader = new FileReader();
      reader.onload=(readerEvt:any)=> {
        this.progress = Math.round((100 * readerEvt.loaded) / readerEvt.total);
        var binaryString = readerEvt.target.result;
        base64string = btoa(binaryString);
        objeto.base_64=base64string;
 
    };
    reader.readAsBinaryString(file);
      ext=file.name.substring(file.name.indexOf('.'),file.name.length)
     
      objeto.extension=ext;
      objeto.nombre=file.name;
     
      this.filesSinGuardar.push(objeto);
    });

    dropzone.reset();
  }


  editingDestino(destino_id){
    this.destinoService.getDestino(destino_id).subscribe((respuesta)=>{
      this.destinoForm.get('nombre').setValue(respuesta.destino.nombre);
      this.destinoForm.get('encabezado').setValue(respuesta.destino.encabezado);
      this.destinoForm.get('descripcion').setValue(respuesta.destino.descripcion);
      this.destinoForm.get('galeria').setValue(respuesta.destino.galeria);

      let galeria:[]=JSON.parse(respuesta.destino.galeria);
      
      if(galeria.length>0){
        // AA= nombre Actual Almacenado

        galeria.map((img,index)=>{
          let objeto={base_64: '', extension: '',nombre: '', nombreAA:''};
          objeto.nombre='galeria almacenado '+(index+1);
          objeto.nombreAA=img;
          this.filesSinGuardar.push(objeto);
        });
        this.progress=100;
        this.guardarArchivos();
    
      }
     
      this.destinoForm.get('highlights').setValue(respuesta.destino.highlights);
      this.destinoForm.get('mas').setValue(respuesta.destino.mas);
      this.selectPais();
      this.destinoForm.get('pais_id').setValue(1);
     
      this.destinoForm.get('lugar_id').setValue(respuesta.destino.lugar_id);

      const tags={};
      const categorias=respuesta.categorias;
      categorias.map((categoria,b)=>{
        const x = (b+1).toString();
        tags[x] =categoria.nombre;
      });
      $('#selectCategoria').html(this.convertirObjetoASelectOpcions(tags)).trigger('change');
      this.destinoForm.get('categoria_id').setValue(respuesta.categorias)

    });
  }


  guardarArchivos(){
   this.galeria=this.filesSinGuardar;
   this.destinoForm.get('galeria').setValue(this.galeria);
  }

  convertirObjetoASelectOpcions(objetos){
    let htmlTags='';
    for (let tag in objetos) {
     htmlTags += '<option value="'+ tag + '"selected="selected">'+ objetos[tag] + '</option>'; 
    }
    return htmlTags;
  }

  createditDestino(){
    if(this.editing){
      this.actualizarDestino();
    }else{
      this.registrarDestino();
    }
  }

  registrarDestino(){
    var categorias=$("select[name='Categoria[]']").map(function(){
      return $(this).val().valueOf();
    }).toArray();

   
    this.destinoForm.get('lugar_id').setValue(parseInt(this.destinoForm.get('lugar_id').value));
      
    this.destinoService.createDestino(this.destinoForm.value).subscribe((respuesta)=>{

      if(respuesta.id){
        if(categorias.length){
          categorias.map((categoria)=>{
            let objeto={
              categoria_id:parseInt(categoria.toString()),
              destino_id:parseInt(respuesta.id)
            }
           
           this.categoriaService.createCategoriaDestino(objeto).subscribe((respuesta)=>{
            
              if(respuesta.success){
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
        })
        }
       
      }
    }, (error)=>{
      console.log(error);
    });
    

  }


  actualizarDestino(){
    this.destinoForm.get('lugar_id').setValue(parseInt(this.destinoForm.get('lugar_id').value));
  
    this.destinoService.updateDestino(this.destino_id,this.destinoForm.value).subscribe((respuesta)=>{
    
      if(respuesta.success){
        Swal.fire(
          'Actualizacion!',
          'Exitoso.',
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/panel/destino']);
        }, 1000);
        
      }
    },(error)=>{
      console.log(error);
    })

  }



  //funcion para cancelar el envio de archivo
  removeFile(index){
    this.filesSinGuardar.splice(index,1); 
  }

  cancelarArchivos(){
    this.filesSinGuardar=[];
    
  }

  selectCategorias(){
    $(document).ready( ()=> {
      const fullUrl=`${environment.api['apiUrl']}categoria`;
      $('#selectCategoria').select2({
          ajax: {
              headers:{
               
                "Content-Type" : "application/json",
              },
              url: fullUrl,
              data: function (params) {
                  return {
                      nombre: params.term,
                      page: params.page || 1
                  };
                 
              },
              dataType: 'json',
              processResults: function (data) {
                data.page = data.page || 1;
                return {
                    results: data.data.map(function (item) {
                        return {
                            id: item.id,
                            text: item.nombre
                        };
                    }),
                    pagination: {
                        more: data.pagination
                    }
                }
            },
              cache: true,
              delay: 250
          },
          placeholder: 'Categoria',
          minimumInputLength : 0,
          multiple: true
      });
   });
  }

}
