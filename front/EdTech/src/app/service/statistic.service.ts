import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../model/club';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(
      'http://localhost:7777/api/clubs/retrieve-all'
    );
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(
      'http://localhost:7777/api/events/retrieve-all'
    );
  }

  calculateStatistics(clubs: Club[], events: Event[]): any {
    const totalClubs = clubs.length;
    const totalEvents = events.length;
    const mostEventsClub = this.findClubWithMostEvents(clubs, events);

    return {
      totalClubs,
      totalEvents,
      mostEventsClub,
    };
  }

  private findClubWithMostEvents(clubs: Club[], events: Event[]): Club | null {
    let maxEventCount = 0;
    let clubWithMostEvents: Club | null = null;
    clubs.forEach((club) => {
      const eventCount = events.filter(
        (event) => event.clubId === club.id
      ).length;
      if (eventCount > maxEventCount) {
        maxEventCount = eventCount;
        clubWithMostEvents = club;
      }
    });
    return clubWithMostEvents;
  }
}
