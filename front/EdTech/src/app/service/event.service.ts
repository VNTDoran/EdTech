import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsUrl = 'http://localhost:7777/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/retrieve-all`);
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  createEvent(eventData: Event): Observable<Event> {
    return this.http.post<Event>(`${this.eventsUrl}/add`, eventData);
  }

  deleteEvent(id: number): Observable<void> {
    const url = `${this.eventsUrl}/remove/${id}`;
    return this.http.delete<void>(url);
  }
  updateEvent(eventId: number, eventData: Event): Observable<Event> {
    const url = `${this.eventsUrl}/modify`;
    return this.http.put<Event>(url, eventData);
  }
}
