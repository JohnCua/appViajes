import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravellistComponent } from './travellist/travellist.component';
import { TravelListRoutingModule } from './travel-list-routing.module';



@NgModule({
  declarations: [TravellistComponent],
  imports: [
    CommonModule,
    TravelListRoutingModule
  ]
})
export class TravellistModule { }
