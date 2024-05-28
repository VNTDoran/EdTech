import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { UserAuthService } from './user-auth.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = 'http://localhost:7777/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    console.log( this.http.get<Event[]>(this.eventsUrl+"/retrieve-all"));
    return this.http.get<Event[]>(this.eventsUrl+"/retrieve-all");
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  createEvent(event: Event): Observable<Event> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Event>(this.eventsUrl+"/add", event, { headers });
  }

  deleteEvent(id: number): Observable<void> {
    const url = `${this.eventsUrl}/remove/${id}`;
    return this.http.delete<void>(url);
  }
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.eventsUrl}/modify`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Event>(url, Event, { headers });
  }


}
