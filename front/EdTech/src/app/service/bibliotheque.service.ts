import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BibliothequeService {

  constructor() { }

  // Méthode factice pour récupérer les données des livres
  getLivres() {
    return [
      { titre: 'Livre 1', auteur: 'Auteur 1', isbn: '1234567890', anneePublication: 2020 },
      { titre: 'Livre 2', auteur: 'Auteur 2', isbn: '0987654321', anneePublication: 2019 },
      { titre: 'Livre 3', auteur: 'Auteur 3', isbn: '1112223334', anneePublication: 2018 }
    ];
  }

  // Méthode factice pour récupérer les données des documents
  getDocuments() {
    return [
      { titre: 'Document 1', auteur: 'Auteur 1', type: 'Type 1', datePublication: '01/01/2022' },
      { titre: 'Document 2', auteur: 'Auteur 2', type: 'Type 2', datePublication: '02/02/2021' },
      { titre: 'Document 3', auteur: 'Auteur 3', type: 'Type 3', datePublication: '03/03/2020' }
    ];
  }
}

