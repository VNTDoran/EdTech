import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizRequest } from 'src/app/quiz/model/quiz';
import { QuizService } from '../../../service/quiz.service';
import { Router } from '@angular/router';
import { QuestionCategory } from '../../model/question-category.enum';

@Component({
  selector: 'quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent implements OnInit {
  quizForm: FormGroup;
  questionCategories = Object.values(QuestionCategory);
  seconds: number[] = [
    60,
    2 * 60,
    3 * 60,
    4 * 60,
    5 * 60,
    6 * 60,
    7 * 60,
    8 * 60,
    9 * 60,
    10 * 60,
    15 * 60,
    20 * 60,
  ];

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      numQuestions: [
        3,
        [Validators.required, Validators.min(3), Validators.max(10)],
      ],
      duration: ['', Validators.required],
      categoryName: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.quizForm.valid) {
      const quizRequest: QuizRequest = this.quizForm.value;
      console.log('Quiz Request:', quizRequest);
      this.quizService.createQuiz(quizRequest).subscribe({
        next: () => {
          console.log('Quiz created successfully');
          this.router.navigate(['/quiz/list']);
        },
        error: (error) => {
          console.error('Error creating quiz:', error);
          this.router.navigate(['/quiz/list']);
        },
      });
    }
  }

  get title() {
    return this.quizForm.controls['title'];
  }

  get duration() {
    return this.quizForm.controls['duration'];
  }

  get numQuestions() {
    return this.quizForm.controls['numQuestions'];
  }

  get categoryName() {
    return this.quizForm.controls['categoryName'];
  }
}
