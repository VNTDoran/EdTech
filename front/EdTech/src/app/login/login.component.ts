import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.logout().subscribe(() => {});
  }

  login(loginForm: NgForm) {
    console.log(loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.roles[0]);
        this.userAuthService.setName(response.username);
        this.userAuthService.setRoles(response.roles[0]);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.roles[0];
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
