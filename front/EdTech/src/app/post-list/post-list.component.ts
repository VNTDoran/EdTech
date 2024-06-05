import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { UserAuthService } from '../service/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommentService } from '../service/comment.service';
import { Comment } from '../model/postcomment';
import { EditCommentDialogComponent } from '../edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from '../delete-comment-dialog/delete-comment-dialog.component';
import { Chart } from 'chart.js/auto';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  username: string = '';
  currentUser: any;
  @ViewChild('chart', { static: true }) chartRef!: ElementRef;
  chart: any;

  constructor(
    private postService: PostService,
    private userAuth: UserAuthService,
    private dialog: MatDialog,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUsername();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts.map((post) => ({
          ...post,
          showEllipsisMenu: false,
          comments: [],
        }));
        this.posts.forEach((post) => this.loadComments(post));
        this.updateChart();
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

  loadComments(post: Post) {
    this.commentService.getCommentsByPostId(post.id).subscribe(
      (comments: Comment[]) => {
        post.comments = comments;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  addComment(post: Post, commentContent: string) {
    const comment: Partial<Comment> = { content: commentContent };
    this.commentService.addComment(post.id, comment).subscribe(
      (newComment: Comment) => {
        post.comments.unshift(newComment);
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }

  isCommentOwner(comment: Comment): boolean {
    return comment.user.username === this.username;
  }

  editComment(post: Post, comment: Comment) {
    const dialogRef = this.dialog.open(EditCommentDialogComponent, {
      width: '400px',
      data: { commentText: comment.content },
    });

    dialogRef.afterClosed().subscribe((editedText) => {
      if (editedText) {
        comment.content = editedText;
        this.commentService.editComment(comment.id, comment).subscribe(
          (updatedComment: Comment) => {
            const index = post.comments.findIndex(
              (c) => c.id === updatedComment.id
            );
            if (index !== -1) {
              post.comments[index] = updatedComment;
            }
          },
          (error) => {
            console.error('Error editing comment:', error);
          }
        );
      }
    });
  }

  deleteComment(post: Post, commentId: number): void {
    const dialogRef = this.dialog.open(DeleteCommentDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.commentService.deleteComment(commentId).subscribe(
          () => {
            post.comments = post.comments.filter(
              (comment) => comment.id !== commentId
            );
          },
          (error) => {
            console.error('Error deleting comment:', error);
          }
        );
      }
    });
  }

  isPostOwner(postId: number): boolean {
    // Find the post with the given postId
    const post = this.posts.find((post) => post.id === postId);
  
    // If the post does not exist or if the user property is undefined, return false
    if (!post || !post.user || !post.user.id) {
      return false;
    }
  
    // Check if the logged-in user ID matches the owner ID of the post
    return post.user.id === this.userAuth.getId();
  }
  

  editPost(postId: number, updatedPost: Post) {
    if (!this.isPostOwner(postId)) {
      // If the logged-in user is not the owner of the post, do not allow editing
      return;
    }
  
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '400px',
      data: { postContent: updatedPost.content },
    });
  
    dialogRef.afterClosed().subscribe((editedContent) => {
      if (editedContent) {
        updatedPost.content = editedContent;
        this.postService.editPost(postId, updatedPost).subscribe(
          (editedPost: Post) => {
            const index = this.posts.findIndex((p) => p.id === postId);
            if (index !== -1) {
              this.posts[index] = editedPost;
            }
          },
          (error) => {
            console.error('Error editing post:', error);
          }
        );
      }
    });
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
            this.loadPosts();
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
      this.postService.unlikePost(postId).subscribe(
        (updatedPost) => {
          if (updatedPost) {
            const index = this.posts.findIndex((p) => p.id === postId);
            if (index !== -1) {
              this.posts[index] = updatedPost;
              this.updateChart();
            }
          }
        },
        (error) => {
          console.error('Error unliking post:', error);
        }
      );
    } else {
      this.postService.likePost(postId).subscribe(
        (updatedPost) => {
          if (updatedPost) {
            const index = this.posts.findIndex((p) => p.id === postId);
            if (index !== -1) {
              this.posts[index] = updatedPost;
              this.updateChart();
            }
          }
        },
        (error) => {
          console.error('Error liking post:', error);
        }
      );
    }
  }

  isPostLiked(post: Post): boolean {
    const currentUser = this.username;
    if (!post.likes || !currentUser) {
      return false;
    }
    return post.likes.some((user) => user.username === currentUser);
  }

  toggleEllipsisMenu(post: Post) {
    post.showEllipsisMenu = !post.showEllipsisMenu;
  }

  loadUsername() {
    const userId = this.userAuth.getId();
    if (userId) {
      this.userAuth.getUserById(userId).subscribe(
        (user) => {
          this.username = user.username;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      console.error('No user ID found');
    }
  }

  generateLikedPostsRate(): number {
    const likedPostsCount = this.posts.filter(
      (post) => post.likes && post.likes.length > 0
    ).length;
    const totalPostsCount = this.posts.length;

    if (totalPostsCount === 0) {
      return 0;
    }

    return (likedPostsCount / totalPostsCount) * 100;
  }

  initChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Liked Posts', 'Not Liked Posts'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#4caf50', '#f44336'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  updateChart() {
    const likedPostsCount = this.posts.filter(
      (post) => post.likes && post.likes.length > 0
    ).length;
    const totalPostsCount = this.posts.length;
    const notLikedPostsCount = totalPostsCount - likedPostsCount;

    this.chart.data.datasets[0].data = [likedPostsCount, notLikedPostsCount];
    this.chart.update();
  }
}
