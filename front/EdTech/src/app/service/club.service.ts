import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../model/club';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private clubsUrl = 'http://localhost:7777/api/clubs';

  constructor(private http: HttpClient) { }

  getClubs(): Observable<Club[]> {
    console.log( this.http.get<Club[]>(this.clubsUrl+"/retrieve-all"));
    return this.http.get<Club[]>(this.clubsUrl+"/retrieve-all");
  }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl);
  }

  createClub(club: Club): Observable<Club> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Club>(this.clubsUrl+"/add", club, { headers });
  }

  deleteClub(id: number): Observable<void> {
    const url = `${this.clubsUrl}/remove/${id}`;
    return this.http.delete<void>(url);
  }
  updateClub(club: Club): Observable<Club> {
    const url = `${this.clubsUrl}/modify`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Club>(url, club, { headers });
  }
  assignEventToClub(clubId: number, eventId: number): Observable<void> {
    const url = `${this.clubsUrl}/assign-event/${clubId}/${eventId}`;
    return this.http.put<void>(url, {});
  }

  deassignEventFromClub(clubId: number): Observable<void> {
    const url = `${this.clubsUrl}/deassign-event/${clubId}`;
    return this.http.put<void>(url, {});
  }

}
