import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../model/register-request';
import { AuthenticationResponse } from '../model/authentication-response';
import { AuthenticationRequest } from '../model/authentication-request';
import {VerificationRequest} from '../model/verification-request';


@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}
  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>();
  baseUrl = 'http://localhost:7777/api/auth';

  public setRoles(role : string) {
    localStorage.setItem('roles',role);
    this.updateIsLoggedInStatus();
  }

  public getRoles(): string {
    return localStorage.getItem('roles')!;
    
  }
  public setIsAdmin(bool : string) {
    localStorage.setItem('isAdmin', bool);
  }
  public getIsAdmin():boolean {
    return localStorage.getItem('isAdmin')==='true'? true : false;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
    this.updateIsLoggedInStatus();
  }

  public getId() : number {
    var id = localStorage.getItem("id") ? localStorage.getItem("id") : "";
    var idInt: number = +id!;
    return idInt;
  }

  public setId(id: string) {
    localStorage.setItem('id', id);
  }

  register(
    registerRequest: RegisterRequest
  ) {
    console.log("tried")
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/signup`, registerRequest);
  }

  public isLoggedInChanged(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private updateIsLoggedInStatus() {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  public clear() {
    localStorage.clear();
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/signin`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }

  public isLoggedIn(): boolean {
    const roles = this.getRoles();
    const token = this.getToken();
    return !!roles && !!token;
  }
}
