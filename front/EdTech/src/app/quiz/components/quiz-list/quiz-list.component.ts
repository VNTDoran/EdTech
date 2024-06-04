import { Component, OnInit } from '@angular/core';
import { Quiz, QuizWrapper } from 'src/app/quiz/model/quiz';
import { QuizService } from '../../../service/quiz.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  quizzes: QuizWrapper[] = [];
  isAdmin: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe((res) => {
      console.log(res);
      this.quizzes = res.sort((a, b) => b.id - a.id);
    });
  }

  deleteQuiz(quizId: number) {
    if (this.isAdmin) {
      // Implement the logic to delete the quiz
      // Example:
      this.quizService.deleteQuiz(quizId).subscribe(response => {
      });
      this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
      console.log(`Quiz with ID ${quizId} deleted`);
    }
  }
}
