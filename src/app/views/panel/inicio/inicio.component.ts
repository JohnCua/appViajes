import { Component, OnInit,NgZone } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import { DestinoService } from 'src/app/services/destino/destino.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  //detalle del destino
  detalle:any;


  constructor(private destinoService:DestinoService, private ngZone:NgZone) { }

  ngOnInit() {
  }

  verDetalleDestino(destiono_id){
    delete this.detalle;
    this.destinoService.getDestino(destiono_id).subscribe((data:any)=>{
      this.detalle=data.destino;
      console.log(this.detalle.galeria)
      let galeria=JSON.parse(this.detalle.galeria);
      this.detalle.galeria=[];

      galeria.map((img)=>{
        this.detalle.galeria.push(img)
      })

    });
  }

  verDetalleTour(tour_id){

  }


}
