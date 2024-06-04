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
import { RegisterComponent } from './register/register.component';
import { CertificatComponent } from './certificat/certificat.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NetworkComponent } from './network/network.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ClubsComponent } from './clubs/clubs.component';
import { EventComponent } from './event/event.component';
import { LivresComponent } from './livre/livre.component';
import { DocumentsComponent } from './document/document.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque.component';
import { LivreDetailsComponent } from './livre-details/livre-details.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { MycertifsComponent } from './mycertifs/mycertifs.component';

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
  { path: 'register', component: RegisterComponent },
  { path: 'certificat', component: CertificatComponent },
  { path: 'detailsCertif/:id', component: CertificateDetailsComponent },
  { path: 'network', component: NetworkComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirm', component: ConfirmationComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'events', component: EventComponent },
  { path: 'livres', component: LivresComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'mycert', component: MycertifsComponent },

  { path: 'bibliotheque', component: BibliothequeComponent },
  { path: 'livre/:id', component: LivreDetailsComponent },
  { path: 'document/:id', component: DocumentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
