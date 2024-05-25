import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from '../service/certificate.service';
import { Certificate } from '../model/certificate';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css'],
})
export class CertificateDetailsComponent implements OnInit {
  certificate: Certificate | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.getCertificate();
  }

  getCertificate(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.certificateService.getCertificateById(id).subscribe(
      (certificate) => (this.certificate = certificate),
      (error) => console.log(error)
    );
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
