import { Component } from '@angular/core';
import { Certificate } from '../model/certificate';
import { CertificateService } from '../service/certificate.service';
import { UserAuthService } from '../service/user-auth.service';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-mycertifs',
  templateUrl: './mycertifs.component.html',
  styleUrls: ['./mycertifs.component.css'],
})
export class MycertifsComponent {
  certificates: Certificate[] = [];

  constructor(
    private certificateService: CertificateService,
    private studentService: StudentService,
    private authService: UserAuthService,
    private router: Router,
    private userService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.studentService.getStudentById(this.authService.getId()).subscribe(
      (student) => {
        this.certificateService.getCertificates(student.id).subscribe(
          (data: Certificate[]) => {
            console.log(data);
            this.certificates = data;
          },
          (error) => {
            console.error('There was an error!', error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
