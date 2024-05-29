import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../model/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'http://localhost:7777/api/Livres';

  constructor(private http: HttpClient) { }

  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl+"/retrieve-all");
  }

  getLivre(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl+"retrieve/{LivreId}"}/${id}`);
  }

  ajouterLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl+"/add", livre);
  }

  modifierLivre(livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.apiUrl+""}/${livre.id}`, livre);
  }

  supprimerLivre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl+"/remove"}/${id}`);
  }
  getLivreById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl}/retrieve/${id}`);
  }
  incrementerScore(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/increment-score/${id}`, {});
  }
  decrementerScore(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/decrement`, null);
  }

}
