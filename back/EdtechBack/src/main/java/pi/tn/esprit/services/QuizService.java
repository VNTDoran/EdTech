package pi.tn.esprit.services;

import pi.tn.esprit.models.Question;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.models.Score;
import pi.tn.esprit.models.User;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.response.QuestionWrapper;
import pi.tn.esprit.payload.response.QuizWrapper;

import java.util.List;

public interface QuizService {
    Quiz createQuiz(String category, int numQ, String title, int duration);
    List<Question> getQuizQuestions(Long id);
    Integer calculateResult(Long id, User user, List<QuestionResponse> responses);
    List<QuizWrapper> getQuizzes(User user);

    Quiz getQuiz(Long id);
    void deleteQuiz(Long id);
    Score getScore(Quiz quiz, User user);
}
