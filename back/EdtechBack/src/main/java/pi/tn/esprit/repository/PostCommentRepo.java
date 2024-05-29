package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pi.tn.esprit.models.Comment;
import pi.tn.esprit.models.PostComment;

import java.util.List;

public interface PostCommentRepo extends JpaRepository<PostComment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.post.id = :postId ORDER BY c.creationDate DESC")
    List<PostComment> findByPostIdOrderByCreationDateDesc(@Param("postId") Long postId);
}