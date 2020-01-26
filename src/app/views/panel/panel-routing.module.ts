import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TourModule } from './tour/tour.module';
import { DestinoModule } from './destino/destino.module';
import { InicioModule } from './inicio/inicio.module';



const routes:Routes= [
  {
  path:'', 
  children: [
    {
      path: 'inicio',
      loadChildren: ()=>InicioModule
    },
    {
      path: 'destino',
      loadChildren: ()=>DestinoModule
    },
    {
      path: 'tours',
      loadChildren: ()=>TourModule
    },
 
    {
      path: '', redirectTo: 'inicio', pathMatch: 'full'
    }
    
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
