import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  createPost(post: Partial<Post>): Observable<Post> {
    const token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const newPost = { ...post, likes: [], comments: [] } as Post;
    return this.http.post<Post>(`${this.apiUrl}/add-post`, newPost, { headers });
  }

  getAllPosts(): Observable<Post[]> {
    const jwtToken = this.userAuthService.getToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    return this.http.get<Post[]>(`${this.apiUrl}/retrieve-all-posts`, {headers});
  }

  deletePost(postId: number): Observable<any> {
    const token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/delete-post/${postId}`, {
      headers,
    });
  }

  editPost(postId: number, updatedPost: Post): Observable<Post> {
    const token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Post>(
      `${this.apiUrl}/edit-post/${postId}`,
      updatedPost,
      { headers }
    );
  }

  likePost(postId: number): Observable<Post> {
    const token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Post>(`${this.apiUrl}/${postId}/like`, null, { headers });
  }

  unlikePost(postId: number): Observable<Post> {
    const token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Post>(`${this.apiUrl}/${postId}/unlike`, { headers });
  }
  
}
