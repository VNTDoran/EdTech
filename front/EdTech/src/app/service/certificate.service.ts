import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Certificate } from '../model/certificate';
import { Major } from '../model/major';
import { ScheduleSheet } from '../model/schedule-sheet';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private baseUrl = 'http://localhost:7777/api/certificates';

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
}
