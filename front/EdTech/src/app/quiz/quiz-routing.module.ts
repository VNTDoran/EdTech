import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizPlayComponent } from './components/quiz-play/quiz-play.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [

      {
        path: 'list',
        component: QuizListComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'play/:id',
        component: QuizPlayComponent,
      },
      {
        path: 'add',
        component: QuizFormComponent,
      },
      {
        path: 'question/add',
        component: QuestionFormComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
