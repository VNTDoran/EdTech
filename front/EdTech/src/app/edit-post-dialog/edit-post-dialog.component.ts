import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent {

  postContent: string;

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { postContent: string }
  ) {
    // Assign the post content received from the parent component to the local variable
    this.postContent = data.postContent;
  }

  // Function to close the dialog without saving changes
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Function to save changes and close the dialog
  saveChanges(): void {
    // Pass the edited content back to the parent component
    this.dialogRef.close(this.postContent);
  }

}
