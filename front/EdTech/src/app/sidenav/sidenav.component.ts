import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent, Event } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { navbarDataStudent } from './nav-data-student';
import { navbarDataGuest } from './nav-data-guest';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
  hidden: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  hidden = true;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  isNavbarVisible: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
        hidden : this.hidden,
      });
    }
  }

  constructor(public router: Router, private userService: UserAuthService, private route: ActivatedRoute) {
    this.router.events.subscribe(url => {
      const excludedRoutes = ['http://localhost:4200/','http://localhost:4200/register','http://localhost:4200/home', 'http://localhost:4200/about', 'http://localhost:4200/login']; // Add more routes as needed
    const currentUrl = window.location.href;
    let isExcluded = false;
    for (const route of excludedRoutes) {
      if (route === currentUrl) {
        isExcluded = true;
        break;
      }
    }

    this.isNavbarVisible = !isExcluded;

    if (this.userService.getRoles() === 'ROLE_ADMIN') {
      this.navData = navbarData;
    } else if (this.userService.getRoles() === 'ROLE_GUEST') {
      this.navData = navbarDataGuest;
    }
    
    this.hidden = isExcluded;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
      hidden : this.hidden,
    });
    })
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
      hidden : this.hidden
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
      hidden : this.hidden
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  toggleSideNav(isOpen: boolean) {
    this.sideNavToggled.emit(isOpen);
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
