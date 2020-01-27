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
    MatTooltipModule
  ]
})
export class DestinoModule { }
