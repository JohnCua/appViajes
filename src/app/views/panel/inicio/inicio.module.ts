import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule,MatTooltipModule} from '@angular/material';
import { SharedModulosModule } from 'src/app/shared/shared-modulos/shared-modulos.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneComponent, NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [InicioComponent],
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    InicioRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    SharedModulosModule
  ]
})
export class InicioModule { }
