package pi.tn.esprit.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Question;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.repository.QuestionRepository;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).get();
    }

    @Override
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestionsForQuiz(String categoryName, Integer numQuestions) {
        List<Question> questions = questionRepository.findRandomQuestionsByCategory(categoryName);
        Collections.shuffle(questions);

        if (questions.size() > numQuestions) {
            return questions.subList(0, numQuestions);
        }

        return questions;
    }

    @Override
    public Integer getScore(List<QuestionResponse> responses) {
        int right = 0;

        for (QuestionResponse response : responses) {
            Question question = questionRepository.findById(response.getId()).get();
            if (response.getResponse().equals(question.getRightAnswer()))
                right++;
        }

        return right;
    }
}
