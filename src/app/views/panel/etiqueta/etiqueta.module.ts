import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtiquetaIndexComponent } from './etiqueta-index/etiqueta-index.component';
import { EtiquetaRoutingModule } from './etiqueta-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule, MatTooltipModule} from '@angular/material';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Select2Module } from 'ng2-select2';


@NgModule({
  declarations: [EtiquetaIndexComponent],
  imports: [
    CommonModule,
    EtiquetaRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    SweetAlert2Module,
    Select2Module
  ]
})
export class EtiquetaModule { }
