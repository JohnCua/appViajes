import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatTooltipModule} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class PanelModule { }
