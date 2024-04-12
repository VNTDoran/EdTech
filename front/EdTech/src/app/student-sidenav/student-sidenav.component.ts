import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-sidenav',
  templateUrl: './student-sidenav.component.html',
  styleUrls: ['./student-sidenav.component.css'],
})
export class StudentSidenavComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor() {}

  toggleSideNav(isOpen: boolean) {
    this.sideNavToggled.emit(isOpen);
  }
}
