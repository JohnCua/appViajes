import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelinicioComponent } from './panelinicio/panelinicio.component';


const routes:Routes=[
  {
        path: '',
        component:PanelinicioComponent,
        data: {
          title: 'inicio'
        }
      }
    
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
