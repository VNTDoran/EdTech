import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';
import { StudentService } from '../service/student.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount = 5000;
  isPaid = false;

  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;

  constructor(private router: Router, private payment: PaymentService,private studenService: StudentService,private userAuth: UserAuthService) { }

  ngOnInit(): void {
    this.studenService.getPaid(this.userAuth.getId()).subscribe((isPaid: boolean) => {
      this.isPaid = isPaid;
    
    if (!this.isPaid) {
      window.paypal.Buttons(
        {
          style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.amount.toString(),
                    currency_code: 'USD'
                  }
                }
              ]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              if (details.status === 'COMPLETED') {
                this.payment.transactionID = details.id;
                this.studenService.setPaid(this.userAuth.getId()).subscribe();
                this.router.navigate(['confirm']);
              }
            });
          },
          onError: (error: any) => {
            console.log(error);
          }
        }
      ).render(this.paymentRef.nativeElement);
    }
  });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

}