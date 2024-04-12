import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-guest-sidenav',
  templateUrl: './guest-sidenav.component.html',
  styleUrls: ['./guest-sidenav.component.css'],
})
export class GuestSidenavComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor() {}

  toggleSideNav(isOpen: boolean) {
    this.sideNavToggled.emit(isOpen);
  }
}
