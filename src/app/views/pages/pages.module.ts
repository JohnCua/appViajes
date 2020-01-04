import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error/error404.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [Error404Component],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
