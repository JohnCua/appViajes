import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoIndexComponent } from './destino-index/destino-index.component';
import { Routes, RouterModule } from '@angular/router';
import { DestinoCreateEditComponent } from './destino-create-edit/destino-create-edit.component';



const routes: Routes=[
  {
    path: '',
    component: DestinoIndexComponent,
    data: {
      title:  'Destinos'
    } 
  },
  {
    path: '',
    children:[
      {
        path: 'registrar',
        component: DestinoCreateEditComponent,
        data: {
          title: 'Registro destino'
        }
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinoRoutingModule { }
