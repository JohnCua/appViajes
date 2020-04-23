import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EtiquetaIndexComponent } from './etiqueta-index/etiqueta-index.component';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaIndexComponent,
    data: {
      title: 'etiqueta'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtiquetaRoutingModule { }
