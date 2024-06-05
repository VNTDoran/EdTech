package pi.tn.esprit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.models.Score;
import pi.tn.esprit.models.User;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score getScoreByQuizAndUser(Quiz quiz, User user);

    List<Score> getAllByQuiz(Quiz quiz);
}
