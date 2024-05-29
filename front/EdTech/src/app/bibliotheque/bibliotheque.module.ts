import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivresComponent } from './livres/livres.component';
import { DocumentsComponent } from './documents/documents.component';
import { BibliothequeComponent } from './bibliotheque.component';



@NgModule({
  declarations: [
    LivresComponent,
    DocumentsComponent,
    BibliothequeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BibliothequeModule { }
