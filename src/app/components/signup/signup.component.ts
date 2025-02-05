import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

import { Router } from '@angular/router';
import { ApiService } from '../../ApiService/api.service';
import { DataSharingService } from '../DataSharing/data-sharing.service';
import { DatasharingService } from '../../services/datasharing.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf,SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @Output() switchToContext = new EventEmitter<string>();
  // contextS = contextSwitch;
  // contexts = Object.values(contextSwitch);

  backOfficeForm!: FormGroup;
  otpForm!: FormGroup;

  signupForm: FormGroup;
  isUsernameAvailable: boolean = false;
  isLoading: boolean = false;
  show2FA: boolean = false;
  username: any;
  password: any;
  otpVerify: any;
  email: any;

  constructor(
    private fb: FormBuilder,
    private apiServic: ApiService,
    private route: Router,
    private dataSharing: DataSharingService,
    private spinner:DatasharingService
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.checkPasswords }
    );

    this.backOfficeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
      gender: ['', Validators.required],
      password: [''],
      userType:'AGENT',
    });

    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      OTP: ['', [Validators.required]],
    });
  }

  onSave() {
    let body = {
      email: this.backOfficeForm.controls['email'].value,
    };
    this.apiServic.generateOtp(body).subscribe((res) => {
      if (res) {
        this.otpVerify = true;
      }
    });
  }

  onSaveOtp() {
    let email = this.backOfficeForm.controls['email'].value;

    let body = {
      email: email,
      otp: this.otpForm.controls['OTP'].value,
    };
    this.apiServic.verifyOtp(body).subscribe((res) => {
      console.log(res);
      if (res?.responseCode == 200) {
        this.spinner.show()
        if(this.backOfficeForm.controls['userType'].value == 'AGENT'){
          this.apiServic.b2bSignIp(this.backOfficeForm.value).subscribe({
            next:(res)=>{
                console.log(res)
                if (res) {
                  this.spinner.hide()
                  alert('User Created Successfully');
                  // window.location.reload();
                  this.dataSharing
                  this.otpVerify = res;
                  this.email = res?.email;
                  this.dataSharing.setConditionSignUp(true);
                } else {
                  alert('Error While Creating User Try Again');
                }
            },error:()=>{
              this.spinner.hide()
              alert('Error While Creating User Try Again');
            }
          })
        }else if(this.backOfficeForm.controls['userType'].value == 'MERCHANT'){
          this.apiServic.merchantReg(this.backOfficeForm.value).subscribe({
            next:(res)=>{
                console.log(res)
                if (res) {
                  this.spinner.hide()
                  alert('User Created Successfully');
                  // window.location.reload();
                  this.dataSharing
                  this.otpVerify = res;
                  this.email = res?.email;
                  this.dataSharing.setConditionSignUp(true);
                } else {
                  alert('Error While Creating User Try Again');
                }
            },error:()=>{
              this.spinner.hide()
              alert('Error While Creating User Try Again');
            }
          })
        }
        alert('OTP Verified Successfully');
      } else {
        alert(res?.error);
      }
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSignup() {
    this.isLoading = true;
    // Simulate HTTP request
    setTimeout(() => {
      this.isUsernameAvailable = true; // Change as needed based on actual HTTP response
      this.isLoading = false;
      this.show2FA = true;
    }, 2000);
  }

  invokeSwitchTo(context: any) {
    console.log('(((((((((((((');
    this.switchToContext.emit(context);
  }
  navigate() {
    this.dataSharing.setConditionSignUp(true);
    // this.route.navigateByUrl('/login');
  }
}
