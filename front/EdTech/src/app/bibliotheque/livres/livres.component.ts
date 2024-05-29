import { Component, OnInit } from '@angular/core';
import { Livre } from '../../model/livre';
import { LivreService } from '../../service/livre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-livre',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {
  livres: Livre[] = [];
  livreEnCours: Livre = { id:1, titre: '', auteur: '', isbn: '', anneePublication: 0,score:0 };
  modeEdition = false;

  constructor(private livreService: LivreService) { }

  ngOnInit(): void {
    this.getLivres();
  }

  getLivres(): void {
    this.livreService.getLivres().subscribe(livres => this.livres = livres);
  }

  ajouterLivre(): void {
    this.livreService.ajouterLivre(this.livreEnCours).subscribe(() => {
      this.getLivres();
      this.livreEnCours = {id:1, titre: '', auteur: '', isbn: '', anneePublication: 0 ,score:0 };
    });
  }

  modifierLivre(livre: Livre): void {
    this.livreEnCours = { ...livre };
    this.modeEdition = true;
  }

  sauvegarderLivre(): void {
    this.livreService.modifierLivre(this.livreEnCours).subscribe(() => {
      this.getLivres();
      this.livreEnCours = { id:1, titre: '', auteur: '', isbn: '', anneePublication: 0,score:0 };
      this.modeEdition = false;
    });
  }

  annulerEdition(): void {
    this.livreEnCours = { id:1, titre: '', auteur: '', isbn: '', anneePublication:0,score:0 };
    this.modeEdition = false;
  }

  supprimerLivre(id: number): void {
    this.livreService.supprimerLivre(id).subscribe(() => {
      this.getLivres();
    });
  }}
