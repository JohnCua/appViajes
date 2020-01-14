import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { TourCreateEditComponent } from './tour-create-edit/tour-create-edit.component';



@NgModule({
  declarations: [TourIndexComponent,TourCreateEditComponent],
  imports: [
    CommonModule,
    TourRoutingModule
  ]
})
export class TourModule { }
