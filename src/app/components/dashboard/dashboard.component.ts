import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OurServicesComponent } from '../Our-Services/our-services.component';
import { DataSharingService } from '../DataSharing/data-sharing.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../ApiService/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OurServicesComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  walletAmount:any
  walletNo: any;
  constructor(private router : Router,
        private apiService: ApiService,
    private dataSharing: DataSharingService,

  ){
    this.apiService
    .getPayFromAccountDetails(this.walletAmount)
    .subscribe((res) => {
      console.log(res);
      sessionStorage.setItem('WalletAmount', res?.data);
      this.dataSharing.currentBalanceData(res?.data);
    });
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

  ngOnInit(){

  }

  gotoProductPage(product : string){
    this.router.navigate(['/product', product], );
  }

  gotoBranchAddress(){
    this.router.navigate(['/branches']);
  }

  ngOnDestroy(){

  }

}
