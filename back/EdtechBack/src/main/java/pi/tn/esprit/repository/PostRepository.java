package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.Query;
import pi.tn.esprit.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p ORDER BY p.creationDate DESC")
    List<Post> findAllPostsOrderedByCreationDate();
}