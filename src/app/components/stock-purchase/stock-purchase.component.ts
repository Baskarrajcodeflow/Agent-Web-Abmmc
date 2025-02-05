import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../ApiService/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { NewDialogComponent } from '../manage-sub-agent/new-dialog/new-dialog.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: 'app-stock-purchase',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent, SignupComponent],
  templateUrl: './stock-purchase.component.html',
  styleUrl: './stock-purchase.component.scss'
})
export class StockPurchaseComponent implements OnInit {
  stockBalance: any;
  totalAmount: any;
  constructor(private apiService:ApiService,
private spinner:DatasharingService){

}

ngOnInit(): void {
  this.profileId = sessionStorage.getItem('SenderUserId')
  let payFrom = sessionStorage.getItem('WalletAmount')
  this.stockTransfer.controls['payFrom'].setValue(payFrom)
  let profileWalletNo:any
  if(sessionStorage){
     profileWalletNo = sessionStorage.getItem('profileWalletNo')
  }
  this.apiService.getStockBalance(profileWalletNo).subscribe((res)=>{
    console.log(res);
    if(res?.responseCode ==200){
      this.stockBalance = res?.data
     this.stockTransfer.controls['stock'].setValue(this.stockBalance)
    }
  })
}
  stockTransfer = new FormGroup({
    walletNo: new FormControl('', Validators.required),
    payFrom: new FormControl('', Validators.required),
    payTo: new FormControl('', Validators.required),
    PIN: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    stockToTransfer: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  profileId!: any;
receiverId!: number;
sendMoney() {


  let body: any = {
    serviceReceiver: {
      id: this.profileId,
    },
    initiator: {
      id: this.profileId,
    },
    serviceProvider: {
      id: this.profileId,
    },
    context: {
      PIN: this.stockTransfer.controls['PIN'].value,
      AMOUNT: String(this.totalAmount),
      MEDIUM: 'web',
      SERVICE_NAME: 'STOCK_PURCHASE',
      CHANNEL: 'WALLET',
    },
  };
  this.spinner.show();
  this.apiService.transferMoney(body).subscribe({
    next:(res)=>{
        console.log(res);
        if (res?.responseCode == 200) {
          alert('Stock Purchase Success');
          this.spinner.hide();
        }
    },error:()=>{
      alert('Error Try Again!!!')
      this.spinner.hide();
    }
  })
}


CheckAFC() {
  let walletNo = sessionStorage.getItem('profileWalletNo')
  this.spinner.show();
  this.apiService
    .checkFeesAndCommission(
      walletNo,
      this.stockTransfer.controls['stockToTransfer'].value
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
}
