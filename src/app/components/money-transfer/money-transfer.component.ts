import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SpinnerComponent } from '../spinner/spinner.component';
import { ApiService } from '../../ApiService/api.service';
import { SpinnerService } from '../spinner/spinner.service';
import { DatasharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css',
})
export class MoneyTransferComponent implements OnInit {
  totalAmount: any;
  profileId!: number;
  receiverId!: number;
  constructor(
    private apiService: ApiService,
    private spinner: DatasharingService
  ) {}
  ngOnInit(): void {
    let data = sessionStorage.getItem('WalletAmount');
    this.Walletform.controls['payFrom'].setValue(data);
    this.apiService.getUserProfile().subscribe((res) => {
      console.log(res);
      this.profileId = res?.data?.id;
      if (res) {
      }
    });
  }
  payToArray: any;
  serchBill() {
    this.spinner.show();
    this.apiService
      .searchUserToPay(this.Walletform.controls['walletNo'].value,'WALLET')
      .subscribe({
        next: (res) => {
          if (res) {
            this.spinner.hide();
          }
          this.payToArray = res?.data;
          this.receiverId = res?.data[0]?.id;
          console.log(this.payToArray, 'aaa');
        },
        error: () => {
          this.spinner.hide();
          alert('Error Please Try Again');
        },
      });
  }
  nextPage: any = 0;
  Walletform = new FormGroup({
    walletNo: new FormControl('', Validators.required),
    payFrom: new FormControl('', Validators.required),
    payTo: new FormControl('', Validators.required),
    PIN: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
  });
  CheckAFC() {
    this.spinner.show();
    this.apiService
      .checkFeesAndCommission(
        this.Walletform.controls['walletNo'].value,
        this.Walletform.controls['amount'].value
      )
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.spinner.hide();
            this.totalAmount = res?.data;
          }
        },
        error: () => {
          this.spinner.hide();
          alert('Error Try Again');
        },
      });
  }

  sendMoney() {
    let body: any = {
      serviceReceiver: {
        id: this.receiverId,
      },
      initiator: {
        id: this.profileId,
      },
      serviceProvider: {
        id: this.profileId,
      },
      context: {
        TRANSACTION_DESCRIPTION: this.Walletform.controls['info'].value,
        PIN: this.Walletform.controls['PIN'].value,
        AMOUNT: String(this.totalAmount),
        MEDIUM: 'web',
        SERVICE_NAME: 'WALLET_TO_WALLET',
        CHANNEL: 'WALLET',
      },
    };
    this.spinner.show();
    this.apiService.transferMoney(body).subscribe((res) => {
      console.log(res);
      if (res) {
        alert(res?.data);
        this.spinner.hide();
      }
    });
  }
  next() {
    this.nextPage++;
  }
}
