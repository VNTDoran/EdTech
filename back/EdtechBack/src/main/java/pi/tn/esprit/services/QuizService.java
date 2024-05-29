package pi.tn.esprit.services;

import pi.tn.esprit.models.Question;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.response.QuestionWrapper;
import pi.tn.esprit.payload.response.QuizWrapper;

import java.util.List;

public interface QuizService {
    Quiz createQuiz(String category, int numQ, String title);
    List<Question> getQuizQuestions(Long id);
    Integer calculateResult(Long id, List<QuestionResponse> responses);
    List<Quiz> getQuizzes();

    Quiz getQuiz(Long id);
}
