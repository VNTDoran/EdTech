import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.css']
})
export class DeleteCommentDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCommentDialogComponent>) { }

  confirmDelete(): void {
    this.dialogRef.close(true); // Return true to indicate deletion
  }

  cancelDelete(): void {
    this.dialogRef.close(); // Close the dialog without performing deletion
  }
}
