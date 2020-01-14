import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TourModule } from './tour/tour.module';
import { DestinoModule } from './destino/destino.module';


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
            component:InicioComponent,
            data: {
              title: 'inicio'
            }
          },
          {
            path: 'destino',
            loadChildren:()=>DestinoModule

          },
          {
            path: 'tour',
            loadChildren:()=>TourModule

          }
        ]
       
      }
    
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
