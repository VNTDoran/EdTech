import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(txtFld: HTMLElement) {
    txtFld.blur();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';    
    const dialogRef = this.dialog.open(CreatePostDialogComponent, dialogConfig);

    dialogRef.componentInstance.closeDialogEvent.subscribe(() => {
      dialogRef.close();
    });
  }
}
