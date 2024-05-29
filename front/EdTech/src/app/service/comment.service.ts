import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/postcomment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:7777/api/comments';

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`);
  }

  addComment(postId: number, comment: Partial<Comment>): Observable<Comment> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.post<Comment>(`${this.apiUrl}/${postId}`, comment);
  }
}
