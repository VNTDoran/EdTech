import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../service/certificate.service';
import { Certificate } from '../model/Certificate';

@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.css']
})
export class CertificatComponent implements OnInit {
  certificates: Certificate[] = [];
  newCertificate: Certificate = {
    id: 0,
    name: '',
    description: '',
    logoLink: '',
    score: 0
  };
  editIndex: number | null = null;

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.getAllCertificates();
  }

  getAllCertificates(): void {
    this.certificateService.getAllCertificates()
      .subscribe(
        certificates => {
          this.certificates = certificates;
          console.log(certificates)
        },
        error => {
          console.log(error);
        }
      );
  }

  addCertificate(): void {
    if (this.newCertificate.name.trim() && this.newCertificate.logoLink.trim()) {
      this.certificateService.addCertificate(this.newCertificate)
        .subscribe(
          certificate => {
            this.certificates.push(certificate);
            this.newCertificate = {
              id: 0,
              name: '',
              description: '',
              logoLink: '',
              score: 0
            };
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  deleteCertificate(id: number): void {
    this.certificateService.removeCertificate(id)
      .subscribe(
        () => {
          this.certificates = this.certificates.filter(certificate => certificate.id !== id);
        },
        error => {
          console.log(error);
        }
      );
  }

  startEditCertificate(index: number): void {
    if (index >= 0 && index < this.certificates.length) {
      this.editIndex = index;
      this.newCertificate = { ...this.certificates[index] };
    }
  }

  handleEditCertificate(): void {
    if (this.editIndex !== null && this.newCertificate.name.trim() && this.newCertificate.logoLink.trim()) {
      this.certificateService.modifyCertificate(this.newCertificate)
        .subscribe(
          () => {
            if (this.editIndex !== null) {
              this.certificates[this.editIndex] = { ...this.newCertificate };
              this.editIndex = null;
              this.newCertificate = {
                id: 0,
                name: '',
                description: '',
                logoLink: '',
                score: 0
              };
            } else {
              console.error('Edit index is null');
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }
}
