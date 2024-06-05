package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pi.tn.esprit.models.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategory(String category);


    List<Question> findRandomQuestionsByCategory(String category);
}
