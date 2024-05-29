package pi.tn.esprit.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Question;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.response.QuestionWrapper;
import pi.tn.esprit.payload.response.QuizWrapper;
import pi.tn.esprit.repository.QuizRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImp implements QuizService {
    private final QuizRepository quizRepository;
    private final QuestionServiceImpl questionService;

    @Override
    public Quiz createQuiz(String category, int numQ, String title) {
        List<Question> questions = questionService.getQuestionsForQuiz(category, numQ);

        Quiz quiz = Quiz
                .builder()
                .title(title)
                .category(category)
                .questions(questions)
                .build();

        return quizRepository.save(quiz);
    }

    @Override
    public List<Question> getQuizQuestions(Long id) {
        var quiz = quizRepository.findById(id);
        if (quiz.isPresent()) {
            return quiz.get().getQuestions();
        }
        return new ArrayList<>();
    }

    @Override
    public Integer calculateResult(Long id, List<QuestionResponse> responses) {
        var score = questionService.getScore(responses);
        return score;
    }

    @Override
    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
//        List<QuizWrapper> wrappers = new ArrayList<>();
//        for (Quiz quiz : quizzes) {
//            wrappers.add(QuizWrapper.toQuizWrapper(quiz));
//        }
//         wrappers;
    }

    @Override
    public Quiz getQuiz(Long id) {
        return quizRepository.findById(id).get();
    }

}
