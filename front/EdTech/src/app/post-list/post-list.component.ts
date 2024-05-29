import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { UserAuthService } from '../service/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommentService } from '../service/comment.service';
import { Comment } from '../model/comment';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  username: string = '';
  currentUser: any;

  constructor(
    private postService: PostService,
    private userAuth: UserAuthService,
    private dialog: MatDialog,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.username = this.userAuth.getName();
  }

  loadPosts() {
    console.log('Fetching posts...');
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        console.log('Posts fetched successfully:', posts);
        this.posts = posts.map((post) => ({
          ...post,
          showEllipsisMenu: false,
          comments: [] // Initialize comments array for each post
        }));
        this.posts.forEach(post => this.loadComments(post));
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }
  
  loadComments(post: Post) {
    console.log(`Loading comments for post ${post.id}`);
    this.commentService.getCommentsByPostId(post.id).subscribe(
      (comments: Comment[]) => {
        console.log(`Comments for post ${post.id}:`, comments);
        post.comments = comments;
      },
      (error) => {
        console.error(`Error loading comments for post ${post.id}:`, error);
      }
    );
  }
  
  addComment(post: Post, commentContent: string) {
    const comment: Partial<Comment> = { content: commentContent };
    console.log(`Adding comment to post ${post.id}:`, comment);
    this.commentService.addComment(post.id, comment).subscribe(
      (newComment: Comment) => {
        console.log(`Comment added to post ${post.id}:`, newComment);
        post.comments.unshift(newComment); // Add the new comment to the top of the comments array
      },
      (error) => {
        console.error(`Error adding comment to post ${post.id}:`, error);
      }
    );
  }
  
  deletePost(postId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this post?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.deletePost(postId).subscribe(
          () => {
            // Remove the deleted post from the local array
            this.posts = this.posts.filter((post) => post.id !== postId);
          },
          (error) => {
            console.error('Error deleting post:', error);
          }
        );
      }
    });
  }
  likePost(post: Post) {
    const postId = post.id;
    if (this.isPostLiked(post)) {
      this.postService.unlikePost(postId).subscribe((updatedPost) => {
        if (updatedPost) {
          const index = this.posts.findIndex((p) => p.id === postId);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
        }
      });
    } else {
      this.postService.likePost(postId).subscribe((updatedPost) => {
        if (updatedPost) {
          const index = this.posts.findIndex((p) => p.id === postId);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
        }
      });
    }
  }

  isPostLiked(post: Post): boolean {
    const currentUser = this.userAuth.getName();
    if (!post.likes || !currentUser) {
      return false;
    }
    return post.likes.some((user) => user.username === currentUser);
  }

  toggleEllipsisMenu(post: Post) {
    post.showEllipsisMenu = !post.showEllipsisMenu;
  }
}
