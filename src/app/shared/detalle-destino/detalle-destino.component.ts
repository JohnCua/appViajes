import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-destino',
  templateUrl: './detalle-destino.component.html',
  styleUrls: ['./detalle-destino.component.css']
})
export class DetalleDestinoComponent implements OnInit {
  
  @Input() data: any;

  baseURLImagen = environment['apiImagen'].apiUrlImagen;

  constructor() { }

  ngOnInit() {
  }

}
