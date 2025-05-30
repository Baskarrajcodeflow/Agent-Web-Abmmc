import { Component } from '@angular/core';
import { ApiService } from '../../../ApiService/api.service';
import { LoaderComponent } from '../../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-purchase-new',
  standalone: true,
  imports: [LoaderComponent, FormsModule, CommonModule],
  templateUrl: './stock-purchase-new.component.html',
  styleUrl: './stock-purchase-new.component.scss',
})
export class StockPurchaseNewComponent {
  isLoading: boolean = false;
  awccStockBalance: any;
  nonAwccStockBalance: any;
  awwcAmount: any;
  nonAwwcAmount: any;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAwccBalance();
    this.getNonAwccBalance();
  }

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

  purchase(value: any, serviceName: any) {
    let stockPurchaserId = sessionStorage.getItem('SenderUserId');
    let amount: any;
    if (value == 'AWCC') {
      amount = this.awwcAmount;
    } else if (value == 'NON_AWCC') {
      amount = this.nonAwwcAmount;
    }
    let data = {
      initiator: {
        id: stockPurchaserId,
      },
      serviceProvider: {
        id: stockPurchaserId,
      },
      serviceReceiver: {
        id: stockPurchaserId,
      },
      context: {
        SERVICE_NAME: serviceName,
        MEDIUM: 'PHONE',
        CHANNEL: 'PHONE',
        AMOUNT: String(amount),
        STOCK_TYPE: value,
      },
    };
    console.log(data);

    this.isLoading = true;
    this.apiService.stockPurchase(data).subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          this.awwcAmount = '';
          this.nonAwwcAmount = '';
          this.isLoading = false;
          if (value == 'AWCC') {
            this.getAwccBalance();
          } else if (value == 'NON_AWCC') {
            this.getNonAwccBalance();
          }
          alert('Success');
        } else {
          this.isLoading = false;
          alert(res?.data);
        }
      },
      error: () => {
        this.isLoading = false;
        alert('Something Went Wrong.');
      },
    });
  }

  validateAmount(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    
    // Allow only numbers (48-57 are ASCII codes for 0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
