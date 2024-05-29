import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Document } from '../model/document';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  document: Document | undefined;

  constructor(private route: ActivatedRoute, private documentService: DocumentService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.documentService.getDocumentById(id).subscribe(
      (data: Document) => this.document = data,
      (error: any) => console.error('Error fetching document details', error)
    );
  }
}
