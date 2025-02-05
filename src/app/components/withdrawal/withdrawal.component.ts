import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../ApiService/api.service';
import { SpinnerService } from '../spinner/spinner.service';
import { CommonModule } from '@angular/common';
import { DatasharingService } from '../../services/datasharing.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SpinnerComponent],
  templateUrl: './withdrawal.component.html',
  styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent {
  cashOutInForm: FormGroup = new FormGroup ({});
  showCashIn : boolean = true;
  totalAmount: any;
  profileId!: number;
  receiverId!: number;
  feesAndCommission:any
  constructor(private fb: FormBuilder,private apiService:ApiService,private spinner:DatasharingService,private route:Router) { }

  ngOnInit(): void {
    this.cashOutInForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}(\d{1})?$/)]],
      walletAccount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      transactionPin: ['', [Validators.required, Validators.required]]
    });

    this.cashOutInForm.controls['phoneNumber'].valueChanges.subscribe((res)=>{
      if(res.length == 9){
        console.log(res);
        this.spinner.show()
        this.apiService.searchUserToPay(res,'PHONE').subscribe({
          next:(res)=>{
              if(res?.responseCode == 200){
               this.spinner.hide()
              }else{
                this.spinner.hide()
              }
              this.cashOutInForm.controls['walletAccount'].setValue(res?.data[0]?.walletNo)
              this.receiverId = res?.data[0]?.id
          },error:()=>{
            this.spinner.hide()
            alert('Error Try Again!!!')
          }
        })
      }else if(res.length >= 10){
        this.spinner.show()
        this.apiService.searchUserToPay(res,'WALLET').subscribe({
          next:(res)=>{
              if(res?.responseCode == 200){
                this.spinner.hide()
               }else{
            this.spinner.hide()
               }
              this.cashOutInForm.controls['walletAccount'].setValue(res?.data[0]?.walletNo)
              this.receiverId = res?.data[0]?.id
          },error:()=>{
            this.spinner.hide()
            alert('Error Try Again!!!')
          }
        })
   
      }
    })

   
  }
  get amount() { return this.cashOutInForm.get('amount'); }
  get phoneNumber() { return this.cashOutInForm.get('phoneNumber'); }
  get walletAccount() { return this.cashOutInForm.get('walletAccount'); }
  get transactionPin() { return this.cashOutInForm.get('transactionPin'); }

  checkFeesAndCommision(){
    this.spinner.show()
    this.apiService.checkFeesAndCommission(
      this.cashOutInForm.controls['walletAccount'].value,
      this.cashOutInForm.controls['amount'].value
    ).subscribe({
      next:(res)=>{
          if(res?.responseCode == 200){
            this.spinner.hide()
            this.feesAndCommission = res?.data
          }else{
            this.spinner.hide()
          }
      },error:()=>{
        this.spinner.hide()
        alert('Error Try Again!!!')
      }
    })
  }

  onSubmit( type : string): void {
    // if (this.cashOutInForm.valid) {
      // Handle form submission
      let senderId = sessionStorage.getItem('SenderUserId')
      let senderWalletNo = sessionStorage.getItem('profileWalletNo')
        let body: any = {
          serviceReceiver: {
            id: this.receiverId,
          },
          initiator: {
            id: senderId,
          },
          serviceProvider: {
            id: senderId,
          },
          context: {
            PIN: this.cashOutInForm.controls['transactionPin'].value,
            AMOUNT: String(this.feesAndCommission),
            MEDIUM: 'web',
            SERVICE_NAME: 'WITHDRAWAL',
            CHANNEL: 'WALLET',
          },
        };
        this.spinner.show();  
        this.apiService.widthdrawalMoney(body).subscribe((res) => {
          console.log(res);
          if (res?.responseCode == 200) {
            alert('Success');
            this.route.navigateByUrl('/dashboard')
            this.spinner.hide();
            this.apiService.getPayFromAccountDetails(senderWalletNo).subscribe((res)=>{
              sessionStorage.setItem('WalletAmount',res?.data)
            })
          }else{
            alert(res?.error)
            this.spinner.hide()
          }
        });
      if(type == 'cashin'){

      }
      else{
        
      }
      // console.log('Form Submitted!', this.cashOutInForm.value);
    // } else {
    //   console.log('Form not valid');
    // }
  }
}
