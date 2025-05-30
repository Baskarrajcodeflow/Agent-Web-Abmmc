import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../ApiService/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-stock-transfer',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './stock-transfer.component.html',
  styleUrl: './stock-transfer.component.scss'
})
export class StockTransferComponent {
  searchTerm: string = '';
isLoading:boolean = false
  suspend: any;
user: any;
  onSearch(): void {
    let walletAccountNo: any = this.searchTerm
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
 constructor(
    private apiService: ApiService,
    private spinner: DatasharingService
  ) {}
  findUser(value: any, wallet: any) {
    this.isLoading = true
    this.apiService.searchUserToPay(value, wallet).subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          this.isLoading = false
          this.suspend = res?.data[0]?.accountState;
          if (this.suspend != 'ACTIVE') {
            alert(res?.data[0]?.accountState);
          }
          if (res?.data[0]?.walletNo.length != 13) {
            alert('Receiver Account Is Not Verified');
          }
          if (this.suspend == 'ACTIVE') {
            this.user = res?.data[0];
          }
         
        } else {
          this.isLoading = false
          alert(res?.error);
        }
      },
      error: () => {
        this.isLoading = false
        alert('Error Please Try Again');
      },
    });
  }
}
