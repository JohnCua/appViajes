import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtiquetaIndexComponent } from './etiqueta-index/etiqueta-index.component';
import { EtiquetaRoutingModule } from './etiqueta-routing.module';



@NgModule({
  declarations: [EtiquetaIndexComponent],
  imports: [
    CommonModule,
    EtiquetaRoutingModule
  ]
})
export class EtiquetaModule { }
