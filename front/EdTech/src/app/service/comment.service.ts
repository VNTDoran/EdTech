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

  private getAuthHeaders(): HttpHeaders {
    const jwtToken = this.userAuthService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`, { headers });
  }

  addComment(postId: number, comment: Partial<Comment>): Observable<Comment> {
    const headers = this.getAuthHeaders();
    return this.http.post<Comment>(`${this.apiUrl}/${postId}`, comment, { headers });
  }

  editComment(commentId: number, comment: Partial<Comment>): Observable<Comment> {
    const headers = this.getAuthHeaders();
    return this.http.put<Comment>(`${this.apiUrl}/${commentId}`, comment, { headers });
  }

  deleteComment(commentId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`, { headers });
  }
}
