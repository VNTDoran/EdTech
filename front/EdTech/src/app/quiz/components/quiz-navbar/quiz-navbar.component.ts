import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';

@Component({
  selector: 'quiz-navbar',
  templateUrl: './quiz-navbar.component.html',
  styleUrls: ['./quiz-navbar.component.css']
})
export class QuizNavbarComponent {

  constructor(
    public dialog: MatDialog
  ) {}

  openQuizForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      any: 1,
    };
    this.dialog.open(QuizFormComponent, dialogConfig);
  }


}
