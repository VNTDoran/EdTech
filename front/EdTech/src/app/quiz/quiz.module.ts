import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizNavbarComponent } from './components/quiz-navbar/quiz-navbar.component';
import { QuizPlayComponent } from './components/quiz-play/quiz-play.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizService } from '../service/quiz.service';


@NgModule({
  declarations: [
    QuizComponent,
    QuizNavbarComponent,
    QuizPlayComponent,
    QuizFormComponent,
    QuizListComponent,
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuizRoutingModule
  ],
  providers: [
    QuizService
  ]
})
export class QuizModule { }
