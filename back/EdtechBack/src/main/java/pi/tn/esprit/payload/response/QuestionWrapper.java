package pi.tn.esprit.payload.response;

import lombok.Builder;
import pi.tn.esprit.models.Question;

@Builder
public class QuestionWrapper {
    private Long id;
    private String questionTitle;
    private String category;
    private String option1;
    private String option2;
    private String option3;


    public static QuestionWrapper toQuestionWrapper(Question question) {
        return builder().
                id(question.getId()).
                questionTitle(question.getQuestionTitle()).
                category(question.getCategory()).
                option1(question.getOption1()).
                option2(question.getOption2()).
                option3(question.getOption3()).
                build();
    }
}
