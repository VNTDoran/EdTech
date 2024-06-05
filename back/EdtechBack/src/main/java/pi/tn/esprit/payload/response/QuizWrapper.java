package pi.tn.esprit.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pi.tn.esprit.models.Quiz;

@Getter
@Setter
@Builder
public class QuizWrapper {
    private Long id;
    private String title;
    private String category;
    private Integer numQuestions;
    private Integer duration;
    private Integer score;

    public static QuizWrapper toQuizWrapper(Quiz quiz) {
        return builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .category(quiz.getCategory())
                .numQuestions(quiz.getQuestions().size())
                .duration(quiz.getDuration())
                .score(0)
                .build();
    }

}
