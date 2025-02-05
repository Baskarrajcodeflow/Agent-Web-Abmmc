import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ApiService } from '../../../ApiService/api.service';
import { DatasharingService } from '../../../services/datasharing.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-dialog',
  standalone: true,
  imports: [MatIcon,CommonModule,SpinnerComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './new-dialog.component.html',
  styleUrl: './new-dialog.component.scss'
})
export class NewDialogComponent implements OnInit {
  currentPage: number = 1;
stockBalance:any
  totalAmount: any;
  options: any;
optionData: any;
constructor(@Inject(MAT_DIALOG_DATA) public data:any,private apiService:ApiService,
private spinner:DatasharingService,private dialog:MatDialogRef<NewDialogComponent>){
  console.log(data);
  let profileWalletNo = sessionStorage.getItem('profileWalletNo')
  this.apiService.getStockBalance(profileWalletNo).subscribe((res)=>{
    console.log(res);
    if(res?.responseCode ==200){
      this.stockBalance = res?.data
     this.stockTransfer.controls['stock'].setValue(this.stockBalance)
    }
  })
}

ngOnInit(): void {
  this.profileId = sessionStorage.getItem('SenderUserId')
  this.receiverId = this.data?.id

  this.apiService.subAgentCommission('STOCK_TRANSFER').subscribe({
    next:(res)=>{
      console.log(res);
      this.options = res?.data
    }
  })
}

setCommission(){
  console.log(this.optionData);
  this.spinner.show()
  this.apiService.updateSubAgentCommission(this.data?.id,this.options).subscribe({
    next:(res)=>{
      if(res?.responseCode == 200){
      alert('Comission Set Success')
      this.dialog.close()
  this.spinner.hide()
      }else{
        alert('Error While Setting Commission')
      }
    },error:()=>{
  this.spinner.hide()
      alert('Error While Setting Commission')
    }
  })
}


nextPage() {
  this.currentPage++;
}
nextPageCommission(){
  this.currentPage = 3
}

previousPage() {
  if (this.currentPage !== 1) {
    this.currentPage--;
  }
}
profileId!: any;
receiverId!: number;
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
      PIN: this.stockTransfer.controls['PIN'].value,
      AMOUNT: String(this.totalAmount),
      MEDIUM: 'web',
      SERVICE_NAME: 'STOCK_TRANSFER',
      CHANNEL: 'WALLET',
    },
  };
  this.spinner.show();
  this.apiService.transferMoney(body).subscribe({
    next:(res)=>{
        console.log(res);
        if (res?.responseCode == 200) {
          alert('Stock Transfer Success');
          this.dialog.close()
          this.spinner.hide();
        }
    },error:()=>{
      alert('Error Try Again!!!')
      this.spinner.hide();
    }
  })
}

CheckAFC() {
  this.spinner.show();
  this.apiService
    .checkFeesAndCommission(
      this.data?.walletNumber,
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

stockTransfer = new FormGroup({
  walletNo: new FormControl('', Validators.required),
  payFrom: new FormControl('', Validators.required),
  payTo: new FormControl('', Validators.required),
  PIN: new FormControl('', Validators.required),
  amount: new FormControl('', Validators.required),
  stockToTransfer: new FormControl('', Validators.required),
  stock: new FormControl('', Validators.required),
});
}
