import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleSheet } from '../model/schedule-sheet';

@Injectable({
  providedIn: 'root',
})
export class ScheduleSheetService {
  private apiUrl = 'http://localhost:7777/api/schedule-sheets';

  constructor(private http: HttpClient) {}

  getAllScheduleSheets(): Observable<ScheduleSheet[]> {
    return this.http.get<ScheduleSheet[]>(this.apiUrl + '/retrieve-all');
  }
}
