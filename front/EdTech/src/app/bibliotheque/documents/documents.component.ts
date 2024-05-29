import { Component, OnInit } from '@angular/core';
import { Document } from '../../model/document';
import { DocumentService } from '../../service/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: Document[] = [];
  documentEnCours: Document = { id:1, titre: '', auteur: '', type: '', datePublication: '',score:0 };
  modeEdition = false;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    this.documentService.getDocuments().subscribe(documents => this.documents = documents);
  }

  ajouterDocument(): void {
    this.documentService.ajouterDocument(this.documentEnCours).subscribe(() => {
      this.getDocuments();
      this.resetForm();
    });
  }

  modifierDocument(document: Document): void {
    this.documentEnCours = { ...document };
    this.modeEdition = true;
  }

  sauvegarderDocument(): void {
    this.documentService.modifierDocument(this.documentEnCours).subscribe(() => {
      this.getDocuments();
      this.resetForm();
      this.modeEdition = false;
    });
  }

  annulerEdition(): void {
    this.resetForm();
    this.modeEdition = false;
  }

  supprimerDocument(id: number): void {
    this.documentService.supprimerDocument(id).subscribe(() => {
      this.getDocuments();
    });
  }

  private resetForm(): void {
    this.documentEnCours = {id:1, titre: '', auteur: '', type: '', datePublication: '',score:0  };
  }
}
