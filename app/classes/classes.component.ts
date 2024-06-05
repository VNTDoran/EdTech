import { Component, OnInit } from '@angular/core';
import { Classe } from '../model/classe';
import { ClasseService } from '../service/classe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  classes: Classe[] = [];
  filteredClasses: Classe[] = [];
  searchTerm: string = '';
  colors: string[] = ['#4CAF50', '#9C27B0', '#FFC107', '#2196F3']; // Define colors

  constructor(private classeService: ClasseService, private router: Router) {}

  ngOnInit(): void {
    this.classeService.getAllClasses().subscribe(
      (classes) => {
        this.classes = classes;
        this.filteredClasses = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  filterClasses(): void {
    this.filteredClasses = this.classes.filter((classe) =>
      classe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getScheduleSheetLink(classe: Classe): string {
    return classe.scheduleSheet
      ? classe.scheduleSheet.link
      : 'No schedule sheet available';
  }
  getRandomColor(index: number): string {
    const randomIndex = index % this.colors.length;
    return this.colors[randomIndex];
  }
  viewClass(classId: number): void {
    this.router.navigate(['/class', classId]);
  }
}
