import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TravellistModule } from './travellist.module';
import { TravellistComponent } from './travellist/travellist.component';

const routes: Routes=[
  {
      path: '',
      component: TravellistComponent,
      data: {
        title: 'inicio'
      }
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TravelListRoutingModule { }
