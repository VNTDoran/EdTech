import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from "../model/event";
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  eventForm: FormGroup;
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventDate = this.eventForm.value.date; // Récupération de la date du formulaire
      const currentDate = new Date().toISOString().split('T')[0]; // Récupération de la date actuelle au format 'YYYY-MM-DD'

      if (eventDate < currentDate) {
        this.eventForm.reset();
        return;
      }

      this.eventService.createEvent(this.eventForm.value).subscribe(newEvent => {
        this.events.push(newEvent);
        this.eventForm.reset();
      });
    }
  }

  updateEvent(): void {
    if (this.selectedEvent) {
      const eventDate = this.eventForm.value.date;
      const currentDate = new Date().toISOString().split('T')[0];

      if (eventDate < currentDate) {
        this.deleteEvent(this.selectedEvent.id);
        return;
      }

      this.selectedEvent.name = this.eventForm.value.name;
      this.selectedEvent.description = this.eventForm.value.description;

      this.eventService.updateEvent(this.selectedEvent).subscribe(updatedEvent => {
        const index = this.events.findIndex(e => e.id === updatedEvent.id);
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
      date: event.date
    });
  }

  resetFormAndSelectedEvent(): void {
    this.eventForm.reset();
    this.selectedEvent = null;
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(event => event.id !== id);
    });
  }
}
