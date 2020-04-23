import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule, NgxDropzoneComponent } from 'ngx-dropzone';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DetalleDestinoComponent } from '../detalle-destino/detalle-destino.component';
import { BrowserModule } from '@angular/platform-browser';
import { DetalleTourComponent } from '../detalle-tour/detalle-tour.component';

@NgModule({
  declarations: [DetalleDestinoComponent, DetalleTourComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [DetalleDestinoComponent, DetalleTourComponent]
})
export class SharedModulosModule { }
