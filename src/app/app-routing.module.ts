import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesModule } from './views/pages/pages.module';
import { TravellistModule } from './views/travellist/travellist.module';
import { PanelModule } from './views/panel/panel.module';


import {
  FullLayoutPanelComponent,
  FullLayoutTravellistComponent,
  SimpleLayoutComponent
} from './layout';


const routes: Routes = [

 
  //ruta para ir al panel
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
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
