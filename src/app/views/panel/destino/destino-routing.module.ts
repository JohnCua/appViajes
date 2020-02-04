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
        path: 'createdit',
        component: DestinoCreateEditComponent,
        data: {
          title: 'Registro destino'
        }
      },{
        path: 'createdit/:id',
        component:DestinoCreateEditComponent,
        data: {
          title: 'Actualizar destino'
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
