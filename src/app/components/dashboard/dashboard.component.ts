import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OurServicesComponent } from '../Our-Services/our-services.component';
import { DataSharingService } from '../DataSharing/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OurServicesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  walletAmount:any
  constructor(private router : Router,
    private dataSharing: DataSharingService,

  ){
    this.dataSharing.currentBalance$.subscribe((res)=>{
      this.walletAmount = res
    })
  this.walletAmount = sessionStorage.getItem('WalletAmount')
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
