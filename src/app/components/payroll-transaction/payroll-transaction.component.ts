import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatasharingService } from '../../services/datasharing.service';
import { ApiService } from '../../ApiService/api.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-payroll-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './payroll-transaction.component.html',
  styleUrl: './payroll-transaction.component.scss',
})
export class PayrollTransactionComponent {
  constructor(
    private apiService: ApiService,
    private spinner: DatasharingService,
    private route: Router
  ) {}

  dcmsForm = new FormGroup({
    searchNum: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required),
  });

  payRollData: any;
  search() {
    this.spinner.show();
    this.apiService
      .getPayrollBalance(this.dcmsForm.controls['searchNum'].value, 'WALLET')
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res?.responseCode == 200) {
            this.spinner.hide();
            this.payRollData = res?.data?.balance;
            this.receiverId = res?.data?.id;
            console.log(this.payRollData);
          } else {
            this.spinner.hide();
            alert(res?.error);
          }
        },
        error: () => {
          this.spinner.hide();
          alert('Error Try Again!!!');
        },
      });
  }
  profileId!: number;
  receiverId!: number;
  onSubmit(): void {
    // if (this.cashOutInForm.valid) {
    // Handle form submission
    let senderId = sessionStorage.getItem('SenderUserId');
    let senderWalletNo = sessionStorage.getItem('profileWalletNo');
    let body: any = {
      serviceReceiver: {
        id: this.receiverId,
      },
      initiator: {
        id: senderId,
      },
      serviceProvider: {
        id: senderId,
      },
      context: {
        AMOUNT: String(this.dcmsForm.controls['Amount'].value),
        MEDIUM: 'web',
        SERVICE_NAME: 'PAY_ROLL',
        CHANNEL: 'WALLET',
      },
    };
    this.spinner.show();
    this.apiService.payRollMoney(body).subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          alert('Request Sent!!!');
          this.route.navigateByUrl('/dashboard');
          this.spinner.hide();
          this.apiService
            .getPayFromAccountDetails(senderWalletNo)
            .subscribe((res) => {
              sessionStorage.setItem('WalletAmount', res?.data);
            });
        } else {
          alert(res?.error);
          this.spinner.hide();
        }
      },
      error: () => {
        alert('Error Try Again');
        this.spinner.hide();
      },
    });
  }
}
