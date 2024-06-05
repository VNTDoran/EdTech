import { Component, Inject } from '@angular/core';
import { MajorService } from '../service/major.service';
import { ClasseService } from '../service/classe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-major',
  templateUrl: './modal-major.component.html',
  styleUrls: ['./modal-major.component.css'],
})
export class ModalMajorComponent {
  majors!: any[]; // Define type according to your data structure
  selectedMajor: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalMajorComponent>,
    private majorService: MajorService,
    private router: Router,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadMajors();
  }

  loadMajors() {
    this.majorService.getAllMajors().subscribe((majors) => {
      this.majors = majors;
    });
  }

  selectMajor(major: any) {
    this.selectedMajor = major;
  }

  isSelected(major: any): boolean {
    return this.selectedMajor === major;
  }

  assignMajors() {
    this.classeService
      .assignMajorToClass(this.data.classId, this.selectedMajor.id)
      .subscribe(
        () => {
          console.log('Major assigned successfully');
        },
        (error) => {
          console.error('Error assigning major:', error);
        }
      );
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
    this.router.navigate(['/classes']);
  }
}
