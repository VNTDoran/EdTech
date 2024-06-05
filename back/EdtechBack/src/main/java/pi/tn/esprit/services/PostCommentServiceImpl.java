package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.models.Post;
import pi.tn.esprit.models.PostComment;
import pi.tn.esprit.models.User;
import pi.tn.esprit.repository.CommentRepository;
import pi.tn.esprit.repository.PostCommentRepo;
import pi.tn.esprit.repository.PostRepository;
import pi.tn.esprit.repository.UserRepository;
import pi.tn.esprit.services.PostCommentService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostCommentServiceImpl implements PostCommentService {

    @Autowired
    private PostCommentRepo commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public PostComment addComment(Long postId, PostComment comment, String username) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    @Override
    public List<PostComment> getCommentsByPostId(Long postId) {
        List<PostComment> comments = commentRepository.findByPostIdOrderByCreationDateDesc(postId);
        return comments.stream()
                .sorted((c1, c2) -> c2.getCreationDate().compareTo(c1.getCreationDate()))
                .collect(Collectors.toList());
    }

    @Override
    public PostComment editComment(Long commentId, PostComment updatedComment, String username) {
        PostComment existingComment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (existingComment.getUser().getUsername().equals(username)) {
            existingComment.setContent(updatedComment.getContent());
            return commentRepository.save(existingComment);
        } else {
            throw new RuntimeException("You are not authorized to edit this comment");
        }
    }

    @Override
    public void deleteComment(Long commentId, String username) {
        PostComment existingComment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        if (existingComment.getUser().getUsername().equals(username)) {
            commentRepository.delete(existingComment);
        } else {
            throw new RuntimeException("You are not authorized to delete this comment");
        }
    }

}