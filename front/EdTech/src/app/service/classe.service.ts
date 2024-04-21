import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Classe } from '../model/classe';
import { Major } from '../model/major';
import { ScheduleSheet } from '../model/schedule-sheet';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private apiUrl = 'http://localhost:7777/api/classes';

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  getAllClasses(): Observable<Classe[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http
      .get<Classe[]>(`${this.apiUrl}/retrieve-all`, { headers })
      .pipe(map((classes) => classes.map(this.mapToClasse)));
  }

  getClassById(id: number): Observable<Classe> {
    const url = `${this.apiUrl}/retrieve/${id}`;
    return this.http.get<Classe>(url);
  }

  assignScheduleSheetToClass(
    classId: number,
    scheduleSheetId: number
  ): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(
      `${this.apiUrl}/assign-schedule-sheet/${classId}/${scheduleSheetId}`,
      { headers }
    );
  }

  deassignScheduleSheetFromClass(classId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(
      `${this.apiUrl}/deassign-schedule-sheet/${classId}`,
      { headers }
    );
  }

  assignMajorToClass(classId: number, majorId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(
      `${this.apiUrl}/assign-major/${classId}/${majorId}`,
      { headers }
    );
  }

  removeMajorFromClass(classId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(`${this.apiUrl}/deassign-major/${classId}`, {
      headers,
    });
  }

  modifyClass(classId: number, updatedClass: Classe): Observable<Classe> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<Classe>(
      `${this.apiUrl}/modify/${classId}`,
      updatedClass,
      { headers }
    );
  }
  deleteClass(classId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.delete<void>(`${this.apiUrl}/remove/${classId}`, {
      headers,
    });
  }

  private mapToClasse(data: any): Classe {
    const major: Major | null = data.scheduleSheet
      ? {
          id: data.major.id,
          name: data.major.name,
          description: data.major.description,
        }
      : null;

    const scheduleSheet: ScheduleSheet | null = data.scheduleSheet
      ? {
          id: data.scheduleSheet.id,
          link: data.scheduleSheet.link,
        }
      : null;

    const classe: Classe = {
      id: data.id,
      name: data.name,
      major: major,
      scheduleSheet: scheduleSheet,
    };
    return classe;
  }
}
