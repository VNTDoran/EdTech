package pi.tn.esprit.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Question;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.models.Score;
import pi.tn.esprit.models.User;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.response.QuestionWrapper;
import pi.tn.esprit.payload.response.QuizWrapper;
import pi.tn.esprit.repository.QuizRepository;
import pi.tn.esprit.repository.ScoreRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImp implements QuizService {
    private final QuizRepository quizRepository;
    private final QuestionServiceImpl questionService;
    private final ScoreRepository scoreRepository;

    @Override
    public Quiz createQuiz(String category, int numQ, String title, int duration) {
        List<Question> questions = questionService.getQuestionsForQuiz(category, numQ);

        Quiz quiz = Quiz
                .builder()
                .title(title)
                .category(category)
                .duration(duration)
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
    public Integer calculateResult(Long id, User user, List<QuestionResponse> responses) {
        Quiz quiz = getQuiz(id);

        if (quiz != null) {
            Score score = new Score();
            var sc = questionService.getScore(responses);

            score.setQuiz(quiz);
            score.setUser(user);
            score.setValue(sc);

            scoreRepository.save(score);

            return sc;
        }

        return 0;
    }

    @Override
    public List<QuizWrapper> getQuizzes(User user) {
        List<Quiz> quizzes = quizRepository.findAll();

        List<QuizWrapper> wrappers = new ArrayList<>();
        for (Quiz quiz : quizzes) {
            QuizWrapper quizWrapper = QuizWrapper.toQuizWrapper(quiz);
            Score score = getScore(quiz, user);
            if (score != null) {
                quizWrapper.setScore(score.getValue());
            }
            wrappers.add(quizWrapper);
        }

        return wrappers;
    }

    @Override
    public Quiz getQuiz(Long id) {
        return quizRepository.findById(id).get();
    }

    @Override
    public void deleteQuiz(Long id) {
        var quiz = getQuiz(id);
        List<Score> scores = scoreRepository.getAllByQuiz(quiz);
        scoreRepository.deleteAll(scores);
        quizRepository.delete(quiz);
    }

    @Override
    public Score getScore(Quiz quiz, User user) {
        return scoreRepository.getScoreByQuizAndUser(quiz, user);
    }

}
