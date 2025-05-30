import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BundleListComponent } from '../bundle-list/bundle-list/bundle-list.component';
import { MatDialog } from '@angular/material/dialog';
import { BundleItem, BundleList, BundleTopupReq } from '../../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../spinner/spinner.service';
import { ApiService } from '../../../ApiService/api.service';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-bundle-topup-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './bundle-topup-dashboard.component.html',
  styleUrl: './bundle-topup-dashboard.component.scss'
})
export class BundleTopupDashboardComponent {
  bundleList: BundleList[] = [];
  walletBalance = sessionStorage.getItem('WalletAmount');
  selectedBundle: BundleItem | null = null;
  pin: string = '';
  mobileNumber: string = '';
  userId: string | null = null;
  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private spinner: SpinnerService



  ) { }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAwccBalance()
  this.getNonAwccBalance()
}
  onClickViewBundles() {
    this.spinner.show();
    this.apiService.getBundles().subscribe({
      next: (res) => {
        console.log(res);
        if (res?.responseCode == 200) {
          this.spinner.hide();
          this.bundleList = res?.data;
          console.log('Bundle List:', this.bundleList);
          const dialogRef = this.dialog
            .open(BundleListComponent, {
              width: '75%',
              maxHeight: '80vh',
              panelClass: 'custom-dialog-container',
              data: this.bundleList,
              // disableClose:true
            })
            .afterClosed()
            .subscribe((res) => {
              this.selectedBundle = res
              console.log('Dialog closed with result:', res);
            })

        } else {
          this.spinner.hide();
          alert(res?.error);
        }
      }
    });


  }
  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validMobileNumber(){
    const mobilePattern = /.*(7\d{8})$/; // Adjust the pattern as needed
    console.log('Mobile Number:', mobilePattern.test(this.mobileNumber));
    return mobilePattern.test(this.mobileNumber);
  }

  

  onProceedtopup() {
    this.spinner.show();
    this.userId =(sessionStorage.getItem('SenderUserId'));
    console.log('User ID:', this.userId);
    // this.spinner.show();
    let req: BundleTopupReq = {
      initiator: {
        id: Number(this.userId) || 0,
      },
      serviceProvider: {
        id: Number(this.userId) || 0,
      },
      serviceReceiver: {
        id:  Number(this.userId) || 0,
      },
      context: {
        SERVICE_NAME: 'AWCC_BUNDLE',
        MEDIUM: 'web',
        CHANNEL: 'WALLET',
        mobileNumber: this.mobileNumber || '',
        AMOUNT: this.selectedBundle?.price || '0',
        PIN: this.pin,
        bundle: this.selectedBundle?.code || ''
      }
    }

    console.log('Bundle Topup Request:', req);
    this.apiService.bundleTopup(req).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.responseCode == 200) {
          if(res?.data?.status_code === 200){
            alert(res?.data?.status);
          }
          else{
            alert(res?.data?.status +  ' - ' + res?.data?.message);
          }
          this.spinner.hide();
          
        } else {
          this.spinner.hide();
          alert(res?.data +" - " +"An error occurred, please try topup again");
        }
      }
    });
      
    
 
}
nonAwccStockBalance: any;
awccStockBalance: any;
isLoading:boolean = false
getAwccBalance() {
  let accountNo: any = sessionStorage.getItem('profileWalletNo');
  this.isLoading = true;
  this.apiService.getAwccStockBalance(accountNo).subscribe({
    next: (res) => {
      if (res?.responseCode == 200) {
        this.isLoading = false;
        this.awccStockBalance = res?.data;
        console.log(res);
      }
    },
    error: () => {
      this.isLoading = false;
      alert('Something Went Wrong.');
    },
  });
}

getNonAwccBalance() {
  let accountNo: any = sessionStorage.getItem('profileWalletNo');
  this.isLoading = true;
  this.apiService.getNonAwccStockBalance(accountNo).subscribe({
    next: (res) => {
      if (res?.responseCode == 200) {
        this.isLoading = false;
        this.nonAwccStockBalance = res?.data;
        console.log(res);
      }
    },
    error: () => {
      this.isLoading = false;
      alert('Something Went Wrong.');
    },
  });
}
}






