import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.css']
})
export class EditCommentDialogComponent {

  editedCommentText: string;

  constructor(
    public dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { commentText: string }
  ) {
    // Initialize the edited comment text with the current comment text
    this.editedCommentText = data.commentText;
  }

  onCancelClick(): void {
    // Close the dialog without any changes
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.editedCommentText);
  }

}
