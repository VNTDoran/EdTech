import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../service/post.service';
import { UserAuthService } from '../service/user-auth.service';
import { Post } from '../model/post';
import { AttachedFile } from '../model/AttachedFile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css'],
})
export class CreatePostDialogComponent implements OnInit {
  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() postCreated = new EventEmitter<void>();

  attachedFiles: AttachedFile[] = [];
  fileAttached: boolean = false;
  dialogWidth: number = 600;
  postContent: string = '';
  postId!: number;
  username: string = '';
  posts: Post[] = [];

  constructor(
    private userAuth: UserAuthService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.userAuth.getName();
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  handleFileInput(event: Event, fileType: string) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
  }

  processFiles(files: FileList) {
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

  removeAttachedFile(file: AttachedFile) {
    const index = this.attachedFiles.indexOf(file);
    if (index !== -1) {
      this.attachedFiles.splice(index, 1);
      this.fileAttached = this.attachedFiles.length > 0;
      this.dialogWidth = 600 + this.attachedFiles.length * 50;
    }
  }

  submitPost() {
    if (this.postContent.trim()) {
      const creationDate = new Date().toISOString();
      const post: Post = {
        id: this.postId,
        content: this.postContent,
        likes: [],
        comments: [],
        creationDate: creationDate,
      };

      this.postService.createPost(post).subscribe(
        (response) => {
          console.log('Post created successfully', response);
          this.closeDialog();
          this.router.navigate([this.router.url]).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error creating post', error);
        }
      );
    }
  }
}
