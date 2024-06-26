import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from '../model/classe';
import { ClasseService } from '../service/classe.service';
import { ModalMajorComponent } from '../modal-major/modal-major.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalScheduleComponent } from '../modal-schedule/modal-schedule.component';
import { ModalStudentComponent } from '../modal-student/modal-student.component';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
})
export class ClassDetailComponent implements OnInit {
  classId: number = 0;
  classDetail: Classe = {} as Classe;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = id ? +id : 0;
    this.getClassDetail(this.classId);
  }

  getClassDetail(id: number): void {
    this.classeService.getClassById(id).subscribe(
      (classDetail) => {
        this.classDetail = classDetail;
      },
      (error) => {
        console.error('Error fetching class details:', error);
      }
    );
  }

  assignMajor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      classId: this.classId,
    };
    this.dialog.open(ModalMajorComponent, dialogConfig);
  }

  
  addStudent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      classId: this.classId,
    };
    this.dialog.open(ModalStudentComponent, dialogConfig);
  }

  assignScheduleSheet() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      classId: this.classId,
    };
    this.dialog.open(ModalScheduleComponent, dialogConfig);
  }

  modifyClass(classId: number, updatedClass: Classe): void {
    this.classeService.modifyClass(classId, updatedClass).subscribe(
      (modifiedClass) => {
        console.log('Class modified successfully:', modifiedClass);
      },
      (error) => {
        console.error('Error modifying class:', error);
      }
    );
  }

  deleteClass(classId: number): void {
    this.classeService.deleteClass(classId).subscribe(
      () => {
        console.log('Class deleted successfully.');
        this.router.navigate(['/classes']);
      },
      (error) => {
        console.error('Error deleting class:', error);
      }
    );
  }

  viewStudents() {
    this.router.navigate(['/students', this.classId]);
  }
}
