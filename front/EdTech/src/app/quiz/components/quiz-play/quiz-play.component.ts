import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionResponse } from 'src/app/quiz/model/question';
import { Quiz } from 'src/app/quiz/model/quiz';
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
  quiz!: Quiz;
  questions: Question[] = [];
  userAnswers: { [key: number]: string } = {};
  score: number = 0;
  totalQuestions: number = 0;
  timeLeft: number = 120; // 1 hour in seconds
  timerSubscription!: Subscription;
  timerExpired: boolean = false;

  constructor(
    private route: ActivatedRoute,
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
      this.totalQuestions = quiz.numQuestions
    });
    // this.quiz = FAKE_QUIZ;
    // this.totalQuestions = FAKE_QUIZ.numQuestions;
  }

  fetchQuestions(): void {
    this.quizService.getQuizQuestions(this.quizId).subscribe((questions: Question[]) => {
      this.questions = questions;
      this.totalQuestions = questions.length;
    });

    // this.questions = FAKE_DATA;
  }

  selectAnswer(questionId: number, selectedOption: string): void {
    if (!this.timerExpired) {
      this.userAnswers[questionId] = selectedOption;
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
    //this.quizService.submitQuizResponses(this.quizId, responses).subscribe(() => {
      // alert('Quiz submitted successfully!');
     //});
    console.log(responses)
  }

  calculateScore(): void {
    this.score = this.questions.filter(
      (q) => this.userAnswers[q.id!] === q.rightAnswer
    ).length;
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timerExpired = true;
        this.timerSubscription.unsubscribe();
        alert('Time is up!');
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
const FAKE_DATA: Question[] = [
  {
    id: 1,
    questionTitle: 'What is the capital of France?',
    option1: 'Berlin',
    option2: 'Madrid',
    option3: 'Paris',
    rightAnswer: 'Paris',
    category: 'General',
  },
  {
    id: 2,
    questionTitle: "Who wrote 'Hamlet'?",
    option1: 'William Shakespeare',
    option2: 'Charles Dickens',
    option3: 'Mark Twain',
    rightAnswer: 'William Shakespeare',
    category: 'General',
  },
  {
    id: 3,
    questionTitle: 'What is the largest planet in our solar system?',
    option1: 'Earth',
    option2: 'Jupiter',
    option3: 'Mars',
    rightAnswer: 'Jupiter',
    category: 'General',
  },
  {
    id: 4,
    questionTitle: 'What is the chemical symbol for water?',
    option1: 'H2O',
    option2: 'O2',
    option3: 'CO2',
    rightAnswer: 'H2O',
    category: 'General',
  },
  {
    id: 5,
    questionTitle: 'Who painted the Mona Lisa?',
    option1: 'Vincent van Gogh',
    option2: 'Pablo Picasso',
    option3: 'Leonardo da Vinci',
    rightAnswer: 'Leonardo da Vinci',
    category: 'General',
  },
  {
    id: 6,
    questionTitle: 'What is the tallest mountain in the world?',
    option1: 'K2',
    option2: 'Mount Everest',
    option3: 'Kangchenjunga',
    rightAnswer: 'Mount Everest',
    category: 'General',
  },
  {
    id: 7,
    questionTitle: 'Which element has the atomic number 1?',
    option1: 'Oxygen',
    option2: 'Hydrogen',
    option3: 'Carbon',
    rightAnswer: 'Hydrogen',
    category: 'General',
  },
  {
    id: 8,
    questionTitle: 'Who was the first President of the United States?',
    option1: 'Abraham Lincoln',
    option2: 'George Washington',
    option3: 'Thomas Jefferson',
    rightAnswer: 'George Washington',
    category: 'General',
  },
  {
    id: 9,
    questionTitle: 'What is the largest ocean on Earth?',
    option1: 'Atlantic Ocean',
    option2: 'Indian Ocean',
    option3: 'Pacific Ocean',
    rightAnswer: 'Pacific Ocean',
    category: 'General',
  },
  {
    id: 10,
    questionTitle: 'What is the hardest natural substance on Earth?',
    option1: 'Gold',
    option2: 'Iron',
    option3: 'Diamond',
    rightAnswer: 'Diamond',
    category: 'General',
  },
];

const FAKE_QUIZ: Quiz = {
  id: 1,
  title: 'General Knowledge',
  category: 'General',
  numQuestions: 10,
};
