import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
  
  
export class MeetService {

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  private apiUrl = 'http://localhost:7777/api/students';


  createEvent(time: string): Observable<string> {
    const jwtToken = this.userAuthService.getToken();
    
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
  
    return this.http.get<string>(
      `${this.apiUrl}/retrievemeet/${time}`,
      { headers }
    );
  }
  
}
