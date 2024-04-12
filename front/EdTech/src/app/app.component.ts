import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserAuthService } from './service/user-auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'EdTech';

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  isSideNavCollapsed: boolean = false;
  screenWidth: number = window.innerWidth;

  constructor(private userAuthService: UserAuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
    this.userAuthService
      .isLoggedInChanged()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedIn) {
          const roles = this.userAuthService.getRoles();
          if (roles && roles.length > 0) {
            this.userRole = roles;
          }
        }
      });
  }

  onToggleSideNav(isOpen: boolean) {
    this.isSideNavCollapsed = !isOpen;
  }
}
