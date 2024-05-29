import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Major } from '../model/major';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  private apiUrl = 'http://localhost:7777/api/majors'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllMajors(): Observable<Major[]> {
    return this.http.get<Major[]>(this.apiUrl + '/retrieve-all');
  }
  getMajorById(id: number): Observable<Major> {
    return this.http.get<Major>(`${this.apiUrl}/${id}`);
  }
}
