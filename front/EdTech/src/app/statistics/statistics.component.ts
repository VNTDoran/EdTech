// import { Component, OnInit } from '@angular/core';
// import { StatisticsService } from '../service/statistic.service';
// import { Club } from '../model/club';
// import { Event } from '../model/event';
//
// @Component({
//   selector: 'app-statistics',
//   templateUrl: './statistics.component.html',
//   styleUrls: ['./statistics.component.css']
// })
// export class StatisticsComponent implements OnInit {
//   clubs: Club[] = [];
//   events: Event[] = [];
//   statistics: any;
//   mostEventsClub: Club | null = null;
//
//   constructor(private statisticsService: StatisticsService) { }
//
//   ngOnInit(): void {
//     this.fetchStatistics();
//   }
//
//   fetchStatistics(): void {
//     this.statisticsService.getClubs().subscribe(clubs => {
//       this.statisticsService.getEvents().subscribe(events => {
//         this.clubs = clubs;
//         this.events = events;
//         this.statistics = this.statisticsService.calculateStatistics(clubs, events);
//
//         // Trouver le club avec le plus d'événements
//         this.mostEventsClub = this.findClubWithMostEvents(clubs, events);
//       });
//     });
//   }
//
//   findClubWithMostEvents(clubs: Club[], events: Event[]): Club | null {
//     let maxEventCount = 0;
//     let clubWithMostEvents: Club | null = null;
//     clubs.forEach(club => {
//       const eventCount = events.filter(event => event.clubId === club.id).length;
//       if (eventCount > maxEventCount) {
//         maxEventCount = eventCount;
//         clubWithMostEvents = club;
//       }
//     });
//     return clubWithMostEvents;
//   }
//
//   onSelect(event: any): void {
//     // Gérer l'événement de sélection ici
//     console.log('Chart selected:', event);
//   }
// }
