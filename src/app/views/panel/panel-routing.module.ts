import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelinicioComponent } from './panelinicio/panelinicio.component';


const routes:Routes=[
  {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            component:PanelinicioComponent,
            data: {
              title: 'inicio'
            }
          },
          {
            path: 'perfil',

          }
        ]
       
      }
    
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
