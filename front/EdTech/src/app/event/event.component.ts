import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../model/event';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm: FormGroup;
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({
        image: file,
      });
    }
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((events) => (this.events = events));
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      const event: Event = {
        id: 0,
        name: formData.name,
        description: formData.description,
        date: formData.date,
        clubId: 0,
        image: null,
      };

      this.eventService.createEvent(event).subscribe((newEvent) => {
        this.events.push(newEvent);
        this.eventForm.reset();
      });
    }
  }

  updateEvent(): void {
    if (this.selectedEvent) {
      const formData = this.eventForm.value;
      const event: Event = {
        id: this.selectedEvent.id,
        name: formData.name,
        description: formData.description,
        date: formData.date,
        clubId: 0,
        image: null,
      };

      this.eventService
        .updateEvent(this.selectedEvent.id, event)
        .subscribe((updatedEvent) => {
          const index = this.events.findIndex((e) => e.id === updatedEvent.id);
          if (index !== -1) {
            this.events[index] = updatedEvent;
          }
          this.resetFormAndSelectedEvent();
        });
    }
  }

  selectEventForUpdate(event: Event): void {
    this.selectedEvent = event;
    this.eventForm.patchValue({
      name: event.name,
      description: event.description,
      date: event.date,
      image: null,
    });
  }

  resetFormAndSelectedEvent(): void {
    this.eventForm.reset();
    this.selectedEvent = null;
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter((event) => event.id !== id);
    });
  }
}
