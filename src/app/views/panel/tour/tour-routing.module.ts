import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { Routes, RouterModule } from '@angular/router';



const routes:Routes=[
  {
    path: '',
    component: TourIndexComponent,
    data: {
      title: 'tour'
    }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
