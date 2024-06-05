import { Component, Inject } from '@angular/core';
import { MajorService } from '../service/major.service';
import { ClasseService } from '../service/classe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';
@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.css']
})
export class ModalStudentComponent {

  students!: any[]; // Define type according to your data structure
  selectedStudent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalStudentComponent>,
    private studentService: StudentService,
    private router: Router,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }

  selectStudent(student: any) {
    this.selectedStudent = student;
  }

  isSelected(student: any): boolean {
    return this.selectedStudent === student;
  }

  assignStudent() {
    this.studentService
      .assignClasseToStudent(this.selectedStudent.id,this.data.classId)
      .subscribe(
        () => {
          console.log('student assigned successfully');
        },
        (error) => {
          console.error('Error assigning student:', error);
        }
      );
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
    this.router.navigate(['/classes']);
  }

}
