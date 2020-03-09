import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModulosModule } from './shared/shared-modulos/shared-modulos.module';
//componentes 

import {
  FullLayoutPanelComponent,
  ContentPanelComponent,
  NavbarPanelComponent,
  SidebarPanelComponent,
  FooterPanelComponent,
  SimpleLayoutComponent
} from './layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './helper/header.interceptor';

//variable contenedor
const APP_CONTAINERS=[
  FullLayoutPanelComponent,
  ContentPanelComponent,
  NavbarPanelComponent,
  SidebarPanelComponent,
  FooterPanelComponent,
  SimpleLayoutComponent
];


@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModulosModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
