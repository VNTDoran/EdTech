import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-sidenav',
  templateUrl: './teacher-sidenav.component.html',
  styleUrls: ['./teacher-sidenav.component.css'],
})
export class TeacherSidenavComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor() {}

  toggleSideNav(isOpen: boolean) {
    this.sideNavToggled.emit(isOpen);
  }
}
