import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule,MatTooltipModule} from '@angular/material';
import { DestinoIndexComponent } from './destino/destino-index/destino-index.component';
import { DestinoCreateEditComponent } from './destino/destino-create-edit/destino-create-edit.component';
import { TourCreateEditComponent } from './tour/tour-create-edit/tour-create-edit.component';


@NgModule({
  declarations: [ InicioComponent, DestinoIndexComponent, DestinoCreateEditComponent, TourCreateEditComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class PanelModule { }
