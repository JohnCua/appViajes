import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { TourCreateEditComponent } from './tour-create-edit/tour-create-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatButtonModule,MatTooltipModule} from '@angular/material';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [TourIndexComponent,TourCreateEditComponent],
  imports: [
    CommonModule,
    TourRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    SweetAlert2Module
  ]
})
export class TourModule { }
