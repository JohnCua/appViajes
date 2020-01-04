import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//componentes 

import {
  FullLayoutPanelComponent,
  ContentPanelComponent,
  NavbarPanelComponent,
  SidebarPanelComponent,
  FooterPanelComponent,
  FullLayoutTravellistComponent,
  ContentTravelistComponent,
  NavbarTravelistComponent,
  FooterTravelistComponent,
  SimpleLayoutComponent
} from './layout';

//variable contenedor
const APP_CONTAINERS=[
  FullLayoutPanelComponent,
  ContentPanelComponent,
  NavbarPanelComponent,
  SidebarPanelComponent,
  FooterPanelComponent,
  FullLayoutTravellistComponent,
  ContentTravelistComponent,
  NavbarTravelistComponent,
  FooterTravelistComponent,
  SimpleLayoutComponent
];


@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
