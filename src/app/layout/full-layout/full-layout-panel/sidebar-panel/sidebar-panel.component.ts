import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/panel/dashboard', title: 'inicio',  icon: 'dashboard', class: '' },
  { path: '/panel/destino', title: 'destino',  icon:'language', class: '' },
  { path: '/panel/tours', title: 'tours',  icon:'explore', class: '' },
  { path: '/panel/user-profile', title: 'perfil',  icon:'person', class: '' },
  { path: '/panel/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar-panel',
  templateUrl: './sidebar-panel.component.html',
  styleUrls: ['./sidebar-panel.component.css']
})
export class SidebarPanelComponent implements OnInit {

  menuItems: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
