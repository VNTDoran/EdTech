import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MediaComponent } from './media/media.component';
import { PagesComponent } from './pages/pages.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { JoinUniversityComponent } from './join-university/join-university.component';
import { NewstudentsComponent } from './newstudents/newstudents.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'coupens',
    loadChildren: () =>
      import('./coupens/coupens.module').then((m) => m.CoupensModule),
  },
  { path: 'newstudents', component: NewstudentsComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'join', component: JoinUniversityComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'class/:id', component: ClassDetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'students/:id', component: StudentsComponent },
  { path: 'students', component: StudentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
