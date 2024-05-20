import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../service/post.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent  {
  post: Post = {
    title: '',
    content: ''
  };

  constructor(private postService: PostService, private authService: UserAuthService) {}

  createPost(): void {
    const token = this.authService.getToken(); // Assuming you have a method in your auth service to get the JWT token
    this.postService.createPost(this.post, token)
      .subscribe(
        (createdPost) => {
          console.log('Post created successfully:', createdPost);
          // Handle success, maybe redirect to the post page or update
        },
        (error) => {
          console.error('Error creating post:', error);
          // Handle error
        }
      );
  }
}
