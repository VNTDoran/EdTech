import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Club } from "../model/club";
import { ClubService } from '../service/club.service';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];
  events: Event[] = [];
  clubForm: FormGroup;
  selectedClub: Club | null = null;
  selectedEvent: Event | null = null;
  showEventList: boolean = false;
  showDetailModal: boolean = false;
  showEventModal: boolean = false;
  selectedDescription: string | null = null;
  assignConfirmationMessage: string | null = null;  // Nouvelle variable pour le message de confirmation

  constructor(
    private clubService: ClubService,
    private eventService: EventService,
    private fb: FormBuilder
  ) {
    this.clubForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClubs();
    this.getEvents();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(clubs => this.clubs = clubs);
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  onSubmit(): void {
    if (this.clubForm.valid) {
      this.clubService.createClub(this.clubForm.value).subscribe(newClub => {
        this.clubs.push(newClub);
        this.clubForm.reset();
      });
    }
  }

  updateClub(): void {
    if (this.selectedClub) {
      this.selectedClub.name = this.clubForm.value.name;
      this.selectedClub.description = this.clubForm.value.description;

      this.clubService.updateClub(this.selectedClub).subscribe(updatedClub => {
        const index = this.clubs.findIndex(c => c.id === updatedClub.id);
        if (index !== -1) {
          this.clubs[index] = updatedClub;
        }
        this.resetFormAndSelectedClub();
      });
    }
  }

  selectClubForUpdate(club: Club): void {
    this.selectedClub = club;
    this.clubForm.patchValue({
      name: club.name,
      description: club.description
    });
  }

  resetFormAndSelectedClub(): void {
    this.clubForm.reset();
    this.selectedClub = null;
  }

  deleteClub(id: number): void {
    this.clubService.deleteClub(id).subscribe(() => {
      this.clubs = this.clubs.filter(club => club.id !== id);
    });
  }

  openEventModal(club: Club): void {
    this.selectedClub = club;
    this.showEventModal = true;
    this.assignConfirmationMessage = null;  // Réinitialiser le message de confirmation lorsque la liste d'événements est affichée
  }

  closeEventModal(): void {
    this.showEventModal = false;
  }

  assignEventToClub(event: Event): void {
    if (this.selectedClub) {
      this.clubService.assignEventToClub(this.selectedClub.id, event.id).subscribe(() => {
        this.assignConfirmationMessage = `Event "${event.name}" has been assigned to Club "${this.selectedClub?.name}".`;
        this.showEventModal = false; // Hide the event list after assigning
      });
    }
  }

  showClubDetail(description: string): void {
    this.selectedDescription = description;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedDescription = null;
  }
}