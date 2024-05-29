import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from '../service/certificate.service';
import { Certificate } from '../model/certificate';
import { Comment } from '../model/comment';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css'],
})
export class CertificateDetailsComponent implements OnInit {
  certificate: Certificate | null = null;
  comments: Comment[] = [];
  newComment: Comment = { id: 0, username: '', text: '' };
  averageRating: number = 0;
  averageRatingStars: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.getCertificate();
    this.getComments();
  }

  getCertificate(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.certificateService.getCertificateById(id).subscribe(
      (certificate) => {
        this.certificate = certificate;
        this.calculateAverageRating();
      },
      (error) => console.log(error)
    );
  }
  getComments(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.certificateService.getComments(id).subscribe(
      (comments) => (this.comments = comments),
      (error) => console.log(error)
    );
  }

  addComment(): void {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.certificateService.addComment(id, this.newComment).subscribe(
      (comment) => {
        this.comments.push(comment);
        this.newComment = { id: 0, username: '', text: '' }; // Reset the new comment object
      },
      (error) => console.log(error)
    );
  }

  addRating(star: number): void {
    if (this.certificate) {
      this.certificate.ratings.push(star);
      this.calculateAverageRating();
    }
  }

  calculateAverageRating(): void {
    if (this.certificate && this.certificate.ratings.length > 0) {
      const total = this.certificate.ratings.reduce(
        (acc, rating) => acc + rating,
        0
      );
      this.averageRating = total / this.certificate.ratings.length;
      this.averageRatingStars = Array(Math.round(this.averageRating)).fill(1);
    } else {
      this.averageRating = 0;
      this.averageRatingStars = [];
    }
  }

  deleteCertificate(): void {
    if (this.certificate && this.certificate.id) {
      this.certificateService.removeCertificate(this.certificate.id).subscribe(
        () => this.router.navigate(['/certificates']),
        (error) => console.log(error)
      );
    }
  }
}
