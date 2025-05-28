import { Component } from '@angular/core';
import { FormComponent } from '../../ui-elements/form/form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DataSharingService } from '../DataSharing/data-sharing.service';


@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule, FormComponent,RouterModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export class OurServicesComponent {
  walletAmount:any
  walletNo: any;
  constructor(private router : Router,    private dataSharing: DataSharingService,
  ){
    this.dataSharing.currentBalance$.subscribe((res)=>{
      if(res){
        this.walletAmount = res
      }
      this.walletAmount = sessionStorage.getItem('WalletAmount')
    })
    this.dataSharing.walletNo$.subscribe((res)=>{
      if(res){
        this.walletNo = res
      }
      this.walletNo = sessionStorage.getItem('profileWalletNo')
    })
  }

  gotoProductPage(product : string){
    console.log(product);
    this.router.navigateByUrl('/MoneyTransfer' );
  }
  PayBills(product : string){
    console.log(product);
    this.router.navigateByUrl('/PayBills' );
  }
  cashInOut(product : string){
    console.log(product);
    this.router.navigateByUrl('/cashinCashoutMain' );
  }
  transactionHistory(){
    this.router.navigateByUrl('/transactionHistory' );
  }
  pushPull(){
    this.router.navigateByUrl('/pushpull' );
  }
  airtimeTopup(){
    this.router.navigateByUrl('/topUp' );
  }
  gotoBranchAddress(){
    this.router.navigate(['/branches']);
  }
  stockPurchase(product : string){
    console.log(product);
    this.router.navigateByUrl('/stockPurchase' );
  }
  dcms(product : string){
    console.log(product);
    this.router.navigateByUrl('/dcms' );
  }

  payroll(product : string){
    console.log(product);
    this.router.navigateByUrl('/payroll' );
  }
}
