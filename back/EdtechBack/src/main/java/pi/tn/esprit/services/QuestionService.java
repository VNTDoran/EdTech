package pi.tn.esprit.services;

import okhttp3.Response;
import pi.tn.esprit.models.Question;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.response.QuestionWrapper;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestions();
    Question getQuestionById(Long id);
    Question addQuestion(Question question);
    List<Question> getQuestionsForQuiz(String categoryName, Integer numQuestions);
    Integer getScore(List<QuestionResponse> responses);
}
