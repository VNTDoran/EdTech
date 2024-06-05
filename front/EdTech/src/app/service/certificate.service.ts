import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../model/certificate';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private baseUrl = 'http://localhost:7777/api/certificates';
  private baseUrl2 = 'http://localhost:7777/api/students';

  constructor(private http: HttpClient) {}

  retrieveAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.baseUrl}/retrieve-all`);
  }
  getCertificatesByCategory(category: string): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(
      `${this.baseUrl}/retrieve-by-category/${category}`
    );
  }

  getCertificateById(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.baseUrl}/retrieve/${id}`);
  }

  addCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(`${this.baseUrl}/add`, certificate);
  }

  removeCertificate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }

  modifyCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(`${this.baseUrl}/modify`, certificate);
  }
  getComments(certificateId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.baseUrl}/${certificateId}/comments`
    );
  }

  addComment(certificateId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.baseUrl}/${certificateId}/comments`,
      comment
    );
  }

  addRating(certificateId: number, rating: number): Observable<Certificate> {
    console.log(rating);
    return this.http.post<Certificate>(
      `${this.baseUrl}/${certificateId}/ratings`,
      rating
    );
  }
  getCertificates(studentId: number): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(
      `${this.baseUrl2}/getcertif/${studentId}`
    );
  }
}
