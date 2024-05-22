import { Component, OnInit } from '@angular/core';
import {AuthenticationRequest} from "../model/authentication-request";
import { AuthenticationResponse } from "../model/authentication-response";
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';
import {VerificationRequest} from '../model/verification-request'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }
  
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};
  submitted: boolean = false;

  authenticate() {
    this.userAuthService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.submitted = true;
          this.authResponse = response;
        }
      });
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      username: this.authRequest.username,
      code: this.otpCode
    };
    this.userAuthService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          console.log(response.accessToken)
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['dashboard']);
        }
      });
  }
}
