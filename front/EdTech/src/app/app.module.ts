import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './service/user.service';
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from './settings/settings.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { ModalMajorComponent } from './modal-major/modal-major.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalScheduleComponent } from './modal-schedule/modal-schedule.component';
import { StudentsComponent } from './students/students.component';
import { NewstudentsComponent } from './newstudents/newstudents.component';
import { HomeComponent } from './home/home.component';
import { JoinUniversityComponent } from './join-university/join-university.component';
import { ModalStudentComponent } from './modal-student/modal-student.component';
import { RegisterComponent } from './register/register.component';
import { CertificatComponent } from './certificat/certificat.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { PostListComponent } from './post-list/post-list.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { NetworkComponent } from './network/network.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
    LoginComponent,
    ClassesComponent,
    ClassDetailComponent,
    CustomDialogComponent,
    ModalMajorComponent,
    ModalScheduleComponent,
    StudentsComponent,
    NewstudentsComponent,
    HomeComponent,
    JoinUniversityComponent,
    ModalStudentComponent,
    RegisterComponent,
    CertificatComponent,
    CertificateDetailsComponent,
    CreatePostComponent,
    CreatePostDialogComponent,
    PostListComponent,
    EditPostDialogComponent,
    ConfirmDialogComponent,
    TimeAgoPipe,
    NetworkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
