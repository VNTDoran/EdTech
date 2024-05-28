package pi.tn.esprit.services;

import pi.tn.esprit.models.Comment;

import java.util.List;

public interface CommentService {
    Comment addComment(Long postId, Comment comment, String username);
    List<Comment> getCommentsByPostId(Long postId);  // Existing method
}
