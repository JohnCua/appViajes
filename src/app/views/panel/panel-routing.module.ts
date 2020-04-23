import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TourModule } from './tour/tour.module';
import { DestinoModule } from './destino/destino.module';
import { InicioModule } from './inicio/inicio.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EtiquetaModule } from './etiqueta/etiqueta.module';

const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'inicio',
      loadChildren: () => InicioModule
    },
    {
      path: 'destino',
      loadChildren: () => DestinoModule
    },
    {
      path: 'tour',
      loadChildren: () => TourModule
    },
    {
      path: 'categoria',
      loadChildren: () => CategoriaModule
    },
    {
      path: 'etiqueta',
      loadChildren: () => EtiquetaModule
    },
    {
      path: '', redirectTo: 'inicio', pathMatch: 'full'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
