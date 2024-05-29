import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../../model/question';
import { QuestionService } from '../../../service/question.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent {
  questionForm!: FormGroup;
  categories: string[] = ['Science', 'Math', 'History', 'Literature'];

  constructor(private fb: FormBuilder, private questionService: QuestionService, private dialog: MatDialog) {
    this.initForm()
  }

  initForm() {
    this.questionForm = this.fb.group({
      questionTitle: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      rightAnswer: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const questionRequest: Question = {
        questionTitle: this.questionForm.value.questionTitle,
        option1: this.questionForm.value.option1,
        option2: this.questionForm.value.option2,
        option3: this.questionForm.value.option3,
        rightAnswer: this.questionForm.value.rightAnswer,
        category: this.questionForm.value.category,
      };
      console.log('Question Request:', questionRequest);
      this.questionService.addQuestion(questionRequest).subscribe({
        next: () => {
          this.questionForm.reset();
        },
        error: (error) => {
          this.questionForm.reset();
        }
      });
    }
  }

  getOptionLabel(option: string): string {
    switch (option) {
      case 'option1':
        return this.option1?.value || 'Option 1';
      case 'option2':
        return this.option2?.value || 'Option 2';
      case 'option3':
        return this.option3?.value || 'Option 3';
      default:
        return '';
    }
  }

  get questionTitle() {
    return this.questionForm.get('questionTitle');
  }

  get option1() {
    return this.questionForm.get('option1');
  }

  get option2() {
    return this.questionForm.get('option2');
  }

  get option3() {
    return this.questionForm.get('option3');
  }

  get rightAnswer() {
    return this.questionForm.get('rightAnswer');
  }

  get category() {
    return this.questionForm.get('category');
  }
}

@Component({
  selector: 'app-success-dialog',
  template: `
    <h1 mat-dialog-title>Success</h1>
    <div mat-dialog-content>
      <p>Question added successfully!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class SuccessDialogComponent {}

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>
      <p>Failed to add the question. Please try again.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class ErrorDialogComponent {}
