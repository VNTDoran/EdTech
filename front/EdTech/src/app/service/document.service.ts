import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:7777/api/Documents';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl+"/retrieve-all");
  }

  getDocument(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl+"retrieve/{DocumentId}"}/${id}`);
  }

  ajouterDocument(Document: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl+"/add", Document);
  }

  modifierDocument(Document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl+""}/${Document.id}`, Document);
  }

  supprimerDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl+"/remove"}/${id}`);
  }
  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/retrieve/${id}`);
  }
  incrementerScore(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/increment-score/${id}`, {});
  }

}
