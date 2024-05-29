import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  transactionId = "";

  constructor(private payment: PaymentService) { }

  ngOnInit(): void {
    this.transactionId = this.payment.transactionID;
  }

}