package pi.tn.esprit.payload.response;

import lombok.Builder;
import pi.tn.esprit.models.Quiz;

@Builder
public class QuizWrapper {
    private Long id;
    private String title;
    private String category;

    public static QuizWrapper toQuizWrapper(Quiz quiz) {
        return builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .category(quiz.getCategory())
                .build();
    }
}
