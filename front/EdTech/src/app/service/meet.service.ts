import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  private token = 'AIzaSyBJN7YbIPyUqT6pMV7AI7-55euBZ4mkaSE';
  private readonly CALENDAR_API_URL =
    'https://www.googleapis.com/calendar/v3/calendars';

  constructor(private http: HttpClient) {}

  createEvent(eventData: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
      .set('Content-Type', 'application/json');

    return this.http.post<any>(
      `${this.CALENDAR_API_URL}/primary/events`,
      eventData,
      { headers }
    );
  }
}
