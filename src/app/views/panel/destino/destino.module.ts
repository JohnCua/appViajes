import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoRoutingModule } from './destino-routing.module';
import { DestinoIndexComponent } from './destino-index/destino-index.component';
import { DestinoCreateEditComponent } from './destino-create-edit/destino-create-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatButtonModule,MatTooltipModule} from '@angular/material';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Select2Module } from 'ng2-select2';

@NgModule({
  declarations: [DestinoIndexComponent,DestinoCreateEditComponent],
  imports: [
    CommonModule,
    DestinoRoutingModule,
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
export class DestinoModule { }
