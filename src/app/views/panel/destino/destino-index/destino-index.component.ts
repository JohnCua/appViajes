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


  constructor(private destinoService:DestinoService) { 
    this.getDestinos();
  }

  ngOnInit() {
    
    this.destinos.paginator = this.paginator;
   
    
  }



  getDestinos(){
   let filtro={}
    this.destinoService.getDestinos(filtro).subscribe((datos:any)=>{
      this.destinos=new MatTableDataSource<any>(datos.data);
    });
  }

}

