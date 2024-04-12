import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css'],
})
export class AdminSidenavComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor() {}

  toggleSideNav(isOpen: boolean) {
    this.sideNavToggled.emit(isOpen);
  }
}
