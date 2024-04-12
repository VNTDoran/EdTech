import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:7777';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.http.post(this.PATH_OF_API + '/api/auth/signin', loginData, {
      headers: this.requestHeader,
    });
  }

  logout(): Observable<any> {
    this.clearUserData();
    return this.http.post(
      this.PATH_OF_API + '/api/auth/signout',
      {},
      this.httpOptions
    );
  }
  private clearUserData(): void {
    localStorage.removeItem('roles');
    localStorage.removeItem('jwtToken');
  }

  public forUser() {
    return this.http.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.http.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  // @ts-ignore
  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles === allowedRoles[j]) {
          isMatch = true;
          return isMatch;
        } else {
          return isMatch;
        }
      }
    }
  }
}
