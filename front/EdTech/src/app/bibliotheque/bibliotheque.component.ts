import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from '../service/livre.service';
import { DocumentService } from '../service/document.service';
import { Livre } from '../model/livre';
import { Document } from '../model/document';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {
  livres: Livre[] = [];
  documents: Document[] = [];

  constructor(
    private livreService: LivreService,
    private documentService: DocumentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerLivres();
    this.chargerDocuments();
  }

  chargerLivres(): void {
    this.livreService.getLivres().subscribe(
      (data: Livre[]) => this.livres = data,
      (error: any) => console.error('Error fetching livres', error)
    );
  }

  chargerDocuments(): void {
    this.documentService.getDocuments().subscribe(
      (data: Document[]) => this.documents = data,
      (error: any) => console.error('Error fetching documents', error)
    );
  }
  showLivreDetails(id: number): void {
    this.livreService.incrementerScore(id).subscribe(() => {
      this.router.navigate(['/livre', id]);
    });
  }

  showDocumentDetails(id: number): void {
    this.documentService.incrementerScore(id).subscribe(() => {
      this.router.navigate(['/document', id]);
    });
}
}