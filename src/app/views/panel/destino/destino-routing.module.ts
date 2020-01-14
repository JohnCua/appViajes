import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoIndexComponent } from './destino-index/destino-index.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {
    path: '',
    component: DestinoIndexComponent,
    data: {
      title: 'Destinos'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinoRoutingModule { }
