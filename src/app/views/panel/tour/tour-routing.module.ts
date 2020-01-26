import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { Routes, RouterModule } from '@angular/router';
import { TourCreateEditComponent } from './tour-create-edit/tour-create-edit.component';



const routes:Routes=[
  {
    path: '',
    component: TourIndexComponent,
    data: {
      title: 'tour'
    }
  },
  {
    path: '',
    children: [
      {
        path: 'createdit',
        component:TourCreateEditComponent,
        data:{
          title: 'Crear Tour'
        }
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
