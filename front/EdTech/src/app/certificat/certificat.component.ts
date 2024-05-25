import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../service/certificate.service';
import { Certificate } from '../model/certificate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.css'],
})
export class CertificatComponent implements OnInit {
  certificates: Certificate[] = [];
  newCertificate: Certificate = {
    id: 0,
    name: '',
    description: '',
    logoLink: '',
    score: 0,
  };
  editIndex: number | null = null;
  showAddForm: boolean = false;
  selectedCategory: string = ''; // Track selected category

  constructor(
    private certificateService: CertificateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCertificates();
  }

  getAllCertificates(): void {
    this.certificateService.retrieveAllCertificates().subscribe(
      (certificates) => {
        this.certificates = certificates;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCertificate(): void {
    if (
      this.newCertificate.name.trim() &&
      this.newCertificate.logoLink.trim()
    ) {
      this.certificateService.addCertificate(this.newCertificate).subscribe(
        (certificate) => {
          this.certificates.push(certificate);
          this.resetForm();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteCertificate(id: number): void {
    this.certificateService.removeCertificate(id).subscribe(
      () => {
        this.certificates = this.certificates.filter(
          (certificate) => certificate.id !== id
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startEditCertificate(index: number): void {
    if (index >= 0 && index < this.certificates.length) {
      this.editIndex = index;
      this.newCertificate = { ...this.certificates[index] };
      this.showAddForm = true;
    }
  }

  handleEditCertificate(): void {
    if (
      this.editIndex !== null &&
      this.newCertificate.name.trim() &&
      this.newCertificate.logoLink.trim()
    ) {
      this.certificateService.modifyCertificate(this.newCertificate).subscribe(
        () => {
          this.certificates[this.editIndex != null ? this.editIndex : 0] = {
            ...this.newCertificate,
          };
          this.resetForm();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  openCertificateDetails(certificate: Certificate): void {
    this.router.navigate(['/detailsCertif', certificate.id]);
  }
  filterByCategory(category: string): void {
    // Implement filtering certificates by category
    this.selectedCategory = category;
    if (this.selectedCategory == '') {
      this.certificateService.retrieveAllCertificates().subscribe(
        (certificates) => {
          this.certificates = certificates;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // Call the service method to fetch certificates by category
    this.certificateService.getCertificatesByCategory(category).subscribe(
      (certificates) => {
        this.certificates = certificates;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  resetForm(): void {
    this.editIndex = null;
    this.newCertificate = {
      id: 0,
      name: '',
      description: '',
      logoLink: '',
      score: 0,
    };
    this.showAddForm = false;
  }
}
