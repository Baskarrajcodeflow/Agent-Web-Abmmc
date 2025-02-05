import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../ApiService/api.service';
import { MatIconModule } from '@angular/material/icon';
import { DatasharingService } from '../../services/datasharing.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-dcms',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,SpinnerComponent],
  templateUrl: './dcms.component.html',
  styleUrl: './dcms.component.scss'
})
export class DcmsComponent {
dcmsForm = new FormGroup({
  searchNum:new FormControl('',Validators.required),
  tazkiraNo:new FormControl('',Validators.required),
})
  dcmsData: any;
  verifySuccess: any;
  constructor(private apiService:ApiService,private spinner:DatasharingService){}
  search(){
    this.verifySuccess = true
    this.spinner.show()
this.apiService.getSearchWithBenificiaryToken(this.dcmsForm.controls['searchNum'].value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res?.responseCode == 200){
    this.spinner.hide()
      this.dcmsData = res?.data
    }
  },error:()=>{
    this.spinner.hide()
  }
})
  }

  verify(){
    let body={
      benId:this.dcmsData?.id,
      token:this.dcmsForm.controls['searchNum'].value
    }
    this.spinner.show()
    this.apiService.verifyToken(body).subscribe({
      next:(res)=>{
        console.log(res);
        if(res?.responseCode == 200){
    this.spinner.hide()
          this.verifySuccess = false
        }else{
          this.spinner.hide()
        }
      },error:()=>{
        this.spinner.hide()
      }
    })
  }

  payNow(){
    let body={
      token:this.dcmsForm.controls['searchNum'].value,
      tazkira:this.dcmsForm.controls['tazkiraNo'].value,
      otp:null
    }
    this.spinner.show()
    this.apiService.makeBenificiaryAsPaid(body).subscribe({
      next:(res)=>{
        if(res?.responseCode ==200){
    this.spinner.hide()
          alert('Success Transaction Updated!!!')
          this.dcmsData = false;
          this.dcmsForm.controls['searchNum'].reset()
        }else{
    this.spinner.hide()
          alert('Error Try Again!!!')
        }
      },error:()=>{
        this.spinner.hide()
      }
    })
  }
}
