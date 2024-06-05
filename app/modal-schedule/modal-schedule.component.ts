import { Component, Inject } from '@angular/core';
import { ScheduleSheetService } from '../service/schedule-sheet.service';
import { ClasseService } from '../service/classe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-schedule',
  templateUrl: './modal-schedule.component.html',
  styleUrls: ['./modal-schedule.component.css'],
})
export class ModalScheduleComponent {
  schedules!: any[]; // Define type according to your data structure
  selectedSchedule: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalScheduleComponent>,
    private modalService: ScheduleSheetService,
    private router: Router,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadSchedules();
  }

  loadSchedules() {
    this.modalService.getAllScheduleSheets().subscribe((schedules) => {
      this.schedules = schedules;
    });
  }

  selectSchedue(schedule: any) {
    this.selectedSchedule = schedule;
  }

  isSelected(schedule: any): boolean {
    return this.selectedSchedule === schedule;
  }

  assignSchedue() {
    this.classeService
      .assignScheduleSheetToClass(this.data.classId, this.selectedSchedule.id)
      .subscribe(
        () => {
          console.log('Schedule assigned successfully');
        },
        (error) => {
          console.error('Error assigning schedule:', error);
        }
      );
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
    this.router.navigate(['/classes']);
  }
}
