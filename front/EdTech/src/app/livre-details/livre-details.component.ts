import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../service/livre.service';
import { Livre } from '../model/livre';

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.component.html',
  styleUrls: ['./livre-details.component.css']
})
export class LivreDetailsComponent implements OnInit {
  livre: Livre | undefined;

  constructor(private route: ActivatedRoute, private livreService: LivreService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.livreService.getLivreById(id).subscribe(
      (data: Livre) => this.livre = data,
      (error: any) => console.error('Error fetching livre details', error)
    );
  }
}
