import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { SpinnerComponent } from '../spinner/spinner.component';
import { ApiService } from '../../ApiService/api.service';
import { SpinnerService } from '../spinner/spinner.service';
import { DatasharingService } from '../../services/datasharing.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    LoaderComponent,
  ],
  templateUrl: './money-transfer.component.html',
  styleUrl: './money-transfer.component.css',
})
export class MoneyTransferComponent implements OnInit {
  totalAmount: any;
  profileId!: number;
  receiverId!: number;
  suspend: any;
  walletNoLength: any;
  dataNew: any;
  constructor(
    private apiService: ApiService,
    private spinner: DatasharingService
  ) {}
  ngOnInit(): void {
    this.dataNew = sessionStorage.getItem('WalletAmount');
    this.Walletform.controls['payFrom'].setValue(this.dataNew);
    this.apiService.getUserProfile().subscribe((res) => {
      console.log(res);
      this.profileId = res?.data?.id;
      if (res) {
      }
    });
    this.Walletform.get('amount')?.setValidators([
      Validators.required,
      Validators.pattern(/^[1-9][0-9]*$/),
      this.maxAmountValidatorFactory(),
    ]);
    this.Walletform.get('amount')?.updateValueAndValidity(); // Refresh validation
  }
  payToArray: any;
  serchBill() {
    let walletAccountNo: any = this.Walletform.controls['walletNo'].value;
    if (
      walletAccountNo.length >= 9 &&
      walletAccountNo.slice(-9).startsWith('7')
    ) {
      // Call the findPhone API
      this.findUser('PHONE', walletAccountNo.slice(-9));
    } else if (walletAccountNo.length === 13) {
      // Call the findWallet API
      this.findUser('WALLET', walletAccountNo);
    }
  }

  findUser(value: any, wallet: any) {
    this.spinner.show();
    this.apiService.searchUserToPay(value, wallet).subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          this.spinner.hide();
          this.suspend = res?.data[0]?.accountState;
          if (this.suspend != 'ACTIVE') {
            alert('Receiver Account Suspended');
          }
          if (res?.data[0]?.walletNo.length != 13) {
            alert('Receiver Account Is Not Verified');
          }
          this.payToArray = res?.data;
          this.receiverId = res?.data[0]?.id;
          this.walletNoLength = res?.data[0]?.walletNo;

          console.log(this.payToArray, 'aaa');
        } else {
          this.spinner.hide();
          alert(res?.error);
        }
      },
      error: () => {
        this.spinner.hide();
        alert('Error Please Try Again');
      },
    });
  }
  maxAmountValidatorFactory() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value);
      return value > this.dataNew ? { maxAmount: true } : null;
    };
  }
  validateAmount(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;

    // Allow only numbers (48-57 are ASCII codes for 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  nextPage: any = 0;
  Walletform = new FormGroup({
    walletNo: new FormControl('', Validators.required),
    payFrom: new FormControl('', Validators.required),
    payTo: new FormControl('', Validators.required),
    PIN: new FormControl('', Validators.required),
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9][0-9]*$/),
      this.maxAmountValidatorFactory(), // Ensures only numbers, no leading zero, no 0 itself
    ]),
    info: new FormControl('', Validators.required),
  });
  isLoading: boolean = false;

  CheckAFC() {
    let walletNo = sessionStorage.getItem('profileWalletNo');
    this.isLoading = true;
    this.apiService
      .checkFeesAndCommission(
        walletNo,
        this.Walletform.controls['amount'].value
      )
      .subscribe({
        next: (res) => {
          if (res?.responseCode == 200) {
            this.isLoading = false;
            console.log(res);
            this.spinner.hide();
            this.totalAmount = res?.data;
          } else {
            this.isLoading = false;
            alert(res?.error);
          }
        },
        error: () => {
          this.isLoading = false;
          alert('Something Went Wrong');
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
      if (res?.responseCode == 200) {
        alert('Money Transfer Success');
        this.spinner.hide();
      }else{
        this.spinner.hide();
        alert(res?.error);
      }
    });
  }
  next() {
    this.nextPage++;
  }
}
