import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionResponse } from 'src/app/quiz/model/question';
import { Quiz, QuizWrapper } from 'src/app/quiz/model/quiz';
import { QuizService } from '../../../service/quiz.service';
import { QuestionService } from '../../../service/question.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.css'],
})
export class QuizPlayComponent implements OnInit, OnDestroy {
  quizId!: number;
  quiz!: QuizWrapper;
  questions: Question[] = [];
  userAnswers: { [key: number]: string } = {};
  score: number = 0;
  totalQuestions: number = 0;
  timeLeft: number = 120; // 1 hour in seconds
  timerSubscription!: Subscription;
  timerExpired: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchQuiz();
    this.fetchQuestions();
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  fetchQuiz(): void {
    this.quizService.getQuiz(this.quizId).subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      this.totalQuestions = quiz.numQuestions;
      this.timeLeft = quiz.duration
    });
  }

  fetchQuestions(): void {
    this.quizService.getQuizQuestions(this.quizId).subscribe((questions: Question[]) => {
      this.questions = questions;
      this.totalQuestions = questions.length;
    });
  }

  selectAnswer(questionId: number, selectedOptionIndex: number): void {
    if (!this.timerExpired) {
      this.userAnswers[questionId] = `option${selectedOptionIndex}`;
    }
  }

  generateResponses(): QuestionResponse[] {
    return Object.keys(this.userAnswers).map(key => ({
      id: +key,
      response: this.userAnswers[+key]
    }));
  }

  submitQuiz(): void {
    const responses = this.generateResponses();
    this.quizService.submitQuiz(this.quizId, responses).subscribe(() => {
      alert('Quiz submitted successfully!');
      this.router.navigate(['/quiz/list']);
    });
    console.log(responses);
    // TODO: Redirect to /quiz/list
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerExpired = true;
        this.timerSubscription.unsubscribe();
        alert('Time is up!');
        this.submitQuiz();
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  get questionsAnswered() {
    return Object.keys(this.userAnswers).length;
  }
}
