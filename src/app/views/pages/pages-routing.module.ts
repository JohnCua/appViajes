import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error/error404.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: Error404Component,
        data: {
          title: 'Error: 404'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
