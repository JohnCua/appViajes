import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaIndexComponent } from './categoria-index/categoria-index.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaIndexComponent,
    data: {
      title: 'categoria'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
