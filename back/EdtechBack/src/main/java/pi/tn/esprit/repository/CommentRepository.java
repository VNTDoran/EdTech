package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.models.Post;

import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.creationDate DESC")
    List<Comment> findByPostIdOrderByCreationDateDesc(@Param("postId") Long postId);
}
