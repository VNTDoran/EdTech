package pi.tn.esprit.payload.request;

public record QuizRequest(String categoryName, Integer numQuestions, String title) {
}
