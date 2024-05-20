import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserAuthService } from '../service/user-auth.service';

interface AttachedFile {
  name: string;
  format: string;
}

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css'],
})
export class CreatePostDialogComponent implements OnInit {
  @Output() closeDialogEvent = new EventEmitter<void>();
  attachedFiles: AttachedFile[] = [];
  fileAttached: boolean = false;
  dialogWidth: number = 600;
  postContent: string = '';
  username: string = '';
  constructor(private userService: UserService, private userAuth: UserAuthService) {}

  ngOnInit() {
    this.username = this.userAuth.getName();
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const files: FileList = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.attachedFiles.push({ name: file.name, format: file.type });
      }
    }
    if (files.length > 0) {
      this.fileAttached = true;
      this.dialogWidth = 600 + this.attachedFiles.length * 50;
    }
  }

  handleFileInput(event: any, fileType: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.attachedFiles.push({ name: file.name, format: file.type });
      this.fileAttached = true;
      this.dialogWidth = 600 + this.attachedFiles.length * 50;
    }
  }

  removeAttachedFile(file: any) {
    const index = this.attachedFiles.indexOf(file);
    if (index !== -1) {
      this.attachedFiles.splice(index, 1);
      this.fileAttached = this.attachedFiles.length > 0;
      this.dialogWidth = 600 + this.attachedFiles.length * 50;
    }
  }
}
