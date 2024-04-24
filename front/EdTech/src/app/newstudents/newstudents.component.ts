import { Component } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetService } from '../service/meet.service';


@Component({
  selector: 'app-newstudents',
  templateUrl: './newstudents.component.html',
  styleUrls: ['./newstudents.component.css']
})
export class NewstudentsComponent {
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
     this.studentService.getAllNewStudents().subscribe(
        (students) => {
          this.students = students;
          this.filteredStudents = students;
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    
  }

  Schedule() {
    let fullUrl = "";
    const baseUrl = 'https://us05web.zoom.us/s/';

    let time = "2024-05-10T12:10:10Z";

    this.meetService.createEvent(time).subscribe(
      (url: string) => {
        fullUrl = baseUrl + url;
        console.log(fullUrl)
      },
      (error) => {
        console.error('Error retrieving meeting:', error);
      }
    );
  }
}
