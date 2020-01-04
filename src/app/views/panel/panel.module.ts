import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelinicioComponent } from './panelinicio/panelinicio.component';
import { PanelRoutingModule } from './panel-routing.module';



@NgModule({
  declarations: [PanelinicioComponent],
  imports: [
    CommonModule,
    PanelRoutingModule
  ]
})
export class PanelModule { }
