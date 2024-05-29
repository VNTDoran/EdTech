package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Question;
import pi.tn.esprit.models.Quiz;
import pi.tn.esprit.payload.request.QuestionResponse;
import pi.tn.esprit.payload.request.QuizRequest;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.QuestionService;
import pi.tn.esprit.services.QuizService;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@Tag(name = "Web Services for Quiz")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService  quizService;
    private final QuestionService questionService;
    private final AuthTokenFilter authtok;
    private final JwtUtils jwtUtils;

    @PostMapping("create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizRequest quizRequest, HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
           var quiz = quizService.createQuiz(quizRequest.categoryName(), quizRequest.numQuestions(), quizRequest.title());
            return ResponseEntity.ok().body(quiz);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("get-questions/{id}")
    public ResponseEntity<List<Question>> getQuizQuestions(@PathVariable Long id, HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            var listQuestions = quizService.getQuizQuestions(id);
            return ResponseEntity.ok(listQuestions);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("get/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id, HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            var quiz = quizService.getQuiz(id);
            return ResponseEntity.ok(quiz);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("get/all")
    public ResponseEntity<?> getQuizzes(HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            List<Quiz> listQuestions = quizService.getQuizzes();
            return ResponseEntity.ok(listQuestions);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Long id, @RequestBody List<QuestionResponse> responses, HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            var score = quizService.calculateResult(id, responses);
            return ResponseEntity.ok(score);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("questions/all")
    public ResponseEntity<List<Question>> getAllQuestions(HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            var questions = questionService.getAllQuestions();
            return ResponseEntity.ok(questions);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("questions/add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question, HttpServletRequest request){
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            questionService.addQuestion(question);
            return ResponseEntity.ok("Question added");
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
