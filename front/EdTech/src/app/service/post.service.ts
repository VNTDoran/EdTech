import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../model/post';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:7777/api/posts';

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // Function to create a new post
  createPost(post: Post, token: string): Observable<Post> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );

    return this.http.post<Post>(`${this.apiUrl}/create-post`, post, {
      headers,
    });
  }
}
