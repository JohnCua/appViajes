import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-tour',
  templateUrl: './detalle-tour.component.html',
  styleUrls: ['./detalle-tour.component.css']
})
export class DetalleTourComponent implements OnInit {

  @Input() data: any;

  baseURLImagen = environment['apiImagen'].apiUrlImagen;

  constructor() { }

  ngOnInit() {
  }

}
