package pi.tn.esprit.services;

import pi.tn.esprit.models.PostComment;

import java.util.List;

public interface PostCommentService {
    PostComment addComment(Long postId, PostComment comment, String username);
    List<PostComment> getCommentsByPostId(Long postId);  // Existing method
}