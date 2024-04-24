import { Component } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from '../service/meet.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  classId: number = 0;
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  colors: string[] = ['#4CAF50', '#9C27B0', '#FFC107', '#2196F3'];

  eventTitle: string = 'Sample Event';
  startTime: Date = new Date();
  endTime: Date = new Date();
  location: string = 'Online';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private meetService: MeetService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.classId = id ? +id : 0;
    if (this.classId === 0) {
      this.studentService.getAllStudents().subscribe(
        (students) => {
          this.students = students;
          this.filteredStudents = students;
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    } else {
      console.log('by id');
      this.studentService.getAllStudentsByClass(this.classId).subscribe(
        (students) => {
          this.students = students;
          this.filteredStudents = students;
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    }
  }

  getRandomColor(index: number): string {
    const randomIndex = index % this.colors.length;
    return this.colors[randomIndex];
  }

  viewStudent(arg0: number) {

   
  }


}
