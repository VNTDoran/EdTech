import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Student } from '../model/student';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:7777/api/students';

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  getAllStudents(): Observable<Student[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http.get<Student[]>(`${this.apiUrl}/retrieve-all`, { headers });
  }

  getAllNewStudents(): Observable<Student[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http.get<Student[]>(`${this.apiUrl}/retrieve-allnew`, { headers });
  }

  getAllStudentsByClass(classId: number): Observable<Student[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http.get<Student[]>(
      `${this.apiUrl}/retrieve-all-by-class/${classId}`,
      { headers }
    );
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.apiUrl}/retrieve/${id}`;
    return this.http.get<Student>(url);
  }

  addStudent(student: Student): Observable<Student> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.post<Student>(`${this.apiUrl}/add`, student, { headers });
  }

  removeStudent(studentId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.delete<void>(`${this.apiUrl}/remove/${studentId}`, {
      headers,
    });
  }

  modifyStudent(student: Student): Observable<Student> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<Student>(`${this.apiUrl}/modify`, student, {
      headers,
    });
  }

  assignClasseToStudent(studentId: number, classeId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(
      `${this.apiUrl}/assign-classe/${studentId}/${classeId}`,
      null,
      { headers }
    );
  }

  deassignClasseFromStudent(studentId: number): Observable<void> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(
      `${this.apiUrl}/deassign-classe/${studentId}`,
      null,
      { headers }
    );
  }


  acceptStudent(studentId: number): Observable<void> {
    console.log(studentId)
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.put<void>(`${this.apiUrl}/confirm-newstudent/${studentId}`, {
      headers,
    });
  }
}
