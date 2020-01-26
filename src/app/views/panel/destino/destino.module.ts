import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoRoutingModule } from './destino-routing.module';
import { DestinoIndexComponent } from './destino-index/destino-index.component';
import { DestinoCreateEditComponent } from './destino-create-edit/destino-create-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DestinoIndexComponent,DestinoCreateEditComponent],
  imports: [
    CommonModule,
    DestinoRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class DestinoModule { }
