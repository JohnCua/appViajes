import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesModule } from './views/pages/pages.module';
import { PanelModule } from './views/panel/panel.module';


import {
  FullLayoutPanelComponent,
  SimpleLayoutComponent
} from './layout';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full',
  },

    // para mostras simple-layout
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>PagesModule,
      },
    ]
  },


  // ruta para joblist general
  {
    path: '',
    component: FullLayoutPanelComponent,
    data: {
      title: 'Panel'
    },
    children: [
      {
        path: 'panel',
        loadChildren: ()=>PanelModule,
      }
    ]
  },

{
  path: '**',
  redirectTo: '404',
  pathMatch: 'full',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
