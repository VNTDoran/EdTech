import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QuizRequest, Quiz } from '../quiz/model/quiz';
import { UserAuthService } from './user-auth.service';
import { Question } from '../quiz/model/question';



@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private url = 'http://localhost:7777/api/quiz'
  private apiUrl = 'http://localhost:7777/api/quiz';
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const jwtToken = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  }

  createQuiz(body: QuizRequest): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.post<string>(`${this.url}/create`, body, { headers });
  }

  getQuizQuestions(id: number): Observable<Question[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Question[]>(`${this.url}/get-questions/${id}`, { headers });
  }

  getQuiz(id: number): Observable<Quiz> {
    const headers = this.getAuthHeaders();
    return this.http.get<Quiz>(`${this.url}/get/${id}`, { headers });
  }


  getQuizzes(): Observable<Quiz[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http
      .get<Quiz[]>(`${this.apiUrl}/get/all`, { headers })
     
  }

  submitQuiz(id: number, responses: Question[]): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.post<number>(`${this.url}/submit/${id}`, responses, {
      headers,
    });
  }
}
