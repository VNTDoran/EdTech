import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private userAuth : UserService,private router: Router) {}

  ngOnInit(): void { }
  
  logout() {
    this.userAuth.logout();
    this.router.navigate(['home']);
  }
}
