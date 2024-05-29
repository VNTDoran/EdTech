import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Question } from '../quiz/model/question';

const API_URL = 'http://localhost:7777/api/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const jwtToken = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  }

  getAllQuestions(): Observable<Question[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Question[]>(`${API_URL}/questions/all`, { headers });
  }

  addQuestion(question: Question): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http
      .post<any>(`${API_URL}/questions/add`, question, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error adding question:', error);
          return throwError(error);
        })
      );
  }
}
