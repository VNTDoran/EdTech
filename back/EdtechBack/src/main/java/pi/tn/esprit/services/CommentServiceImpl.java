package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.models.Post;
import pi.tn.esprit.models.User;
import pi.tn.esprit.repository.CommentRepository;
import pi.tn.esprit.repository.PostRepository;
import pi.tn.esprit.repository.UserRepository;
import pi.tn.esprit.services.CommentService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Comment addComment(Long postId, Comment comment, String username) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostIdOrderByCreationDateDesc(postId);
        return comments.stream()
                .sorted((c1, c2) -> c2.getCreationDate().compareTo(c1.getCreationDate()))
                .collect(Collectors.toList());
    }
}
