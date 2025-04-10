import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { loginReq } from '../../interfaces/interfaces';
import { LoginService } from '../../services/login.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { DataSharingService } from '../DataSharing/data-sharing.service';
import { ApiService } from '../../ApiService/api.service';
import { AuthServices } from '../../core/authservice.service';
import { SignupComponent } from '../signup/signup.component';
import { DatasharingService } from '../../services/datasharing.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    SignupComponent,
    SpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //login data
  loginForm: FormGroup = new FormGroup({});
  loginReq!: loginReq;
  phone: string = '';
  password: string = '';

  //forget password
  email: string = '';
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  currentView:
    | 'login'
    | 'forgotPassword'
    | 'otpVerification'
    | 'newPassword'
    | 'OTP' = 'login';
  result: any;
  key: any;
  salt: any;
  response: any;
  decryptResult: any;
  decryptedText: any;
  tokenData: any;
  timer!: number;
  customerId: any;
  loginId: any;
  otpVerify: any;
  oldpassword: any;
  newPassword: any;
  otpForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private authService: AuthServices,
    private loginService: LoginService,
    private router: Router,
    private apiService: ApiService,
    private dataSharing: DataSharingService,
    private apiServic: ApiService,
    private spinner: DatasharingService
  ) {
    this.dataSharing.setCondition$.subscribe((res) => {
      if (res) {
        this.value = res;
      }
      console.log('Login Component - Value:', this.value);
    });
  }
  ngOnInit() {
    this.key = 'DAdHr3nBFT@hR3QdRK!XwAgA*M!mBB7Qso2J^4dHAN0tAIZg7A';
    this.salt = 'f9Nj*7ZjK!5qJiV@*bIC%5b$7305EDAeZRYy8PYa95!9&ur50';

    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      OTP: ['', [Validators.required]],
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const charCode = event.key;
    if (isNaN(Number(charCode))) {
      event.preventDefault();
    }
  }

  // Function to encrypt a message using PKCS#7 padding and IV
  encryptMessage(message: string): { encryptedText: string; iv: string } {
    const iv = CryptoJS.lib.WordArray.random(16);

    const derivedKey = CryptoJS.PBKDF2(this.key, this.salt, {
      keySize: 256 / 32, // Derive 256-bit key
      iterations: 65536, // Increase iterations for stronger derivation
    });

    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(message),
      derivedKey,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return {
      encryptedText: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Base64),
    };
  }

  decrypt(encryptedData: string, iv: string) {
    const ivString = CryptoJS.enc.Base64.parse(iv).toString();

    // Derive the key using the salt
    var derivedKey = CryptoJS.PBKDF2(this.key, this.salt, {
      keySize: 256 / 32,
      iterations: 65536,
    });

    // Decrypting the data with the derived key and IV
    var decryptedBytes = CryptoJS.AES.decrypt(encryptedData, derivedKey, {
      iv: CryptoJS.enc.Hex.parse(ivString),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      decrptedText: decryptedBytes.toString(CryptoJS.enc.Utf8),
    };
  }
  credentials = {
    username: '',
    password: '',
  };
  username: any = null;
  passwords: any = null;
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpError: string = '';
  isLoading: boolean = false;
  moveToNext(index: number, event: any) {
    if (event.target.value.length === 1 && index < 5) {
      event.target.nextElementSibling?.focus();
    }
  }
  login(event: any) {
    sessionStorage.clear();
    this.credentials.username = this.username;
    this.credentials.password = this.passwords;

    let body = {
      emailOrPhone: this.username,
      password: this.password,
      userType: 'AGENT',
    };
    this.isLoading = true;
    this.apiService.generate(body).subscribe({
      next: (res) => {
        console.log(res);
        if (res?.responseCode == 200) {
          this.isLoading = false;
          if (event == 0) {
            alert('OTP has been sent to your email. Please verify.');
          } else if (event == 1) {
            this.otpDigits = ['', '', '', '', '', ''];
            alert('OTP has been resent to your email. Please verify.');
          }
          this.currentView = 'OTP';
        } else {
          this.isLoading = false;
          this.otpDigits = ['', '', '', '', '', ''];
          alert(res?.error);
        }
      },
      error: () => {
        this.isLoading = false;
        alert('Something Went Wrong');
      },
    });
  }

  loginNew() {
    this.credentials.username = this.username;
    this.credentials.password = this.passwords;
    const otp = this.otpDigits.join('');

    this.authService.login(this.username, this.password, otp).subscribe({
      next: (v: any) => {
        console.log(v);
        if (v?.responseCode == 200 || v?.responseCode == 2) {
          let token = v?.token;
          const helper = new JwtHelperService();
          let decodedToken = helper.decodeToken(JSON.stringify(token));
          if (decodedToken?.iat) {
            const decodedTime = decodedToken.iat * 1000; // Convert from seconds to milliseconds
            const currentTime = Date.now(); // Current time in milliseconds

            console.log(new Date(decodedTime), 'Decoded Time');
            console.log(new Date(currentTime), 'Current Time');

            const timeDifference = (currentTime - decodedTime) / 1000; // Convert to seconds

            if (timeDifference <= 60) {
              alert('Success');
              this.router.navigateByUrl('/dashboard');
              this.dataSharing.loginSignUp(true);
              this.dataSharing.setheaderSignUp(true);
              sessionStorage.setItem('header', JSON.stringify(true));
              sessionStorage.setItem('UserId', decodedToken?.userId);
              this.getProfileData();
            } else {
              // alert('Invalid Token!!!');
              sessionStorage.clear();
              setTimeout(() => {
                window.location.reload();
              }, 50);
              // console.log('❌ Token is older than 30 seconds.');
            }
          } else {
            console.log("⚠️ Invalid token or missing 'iat' field.");
          }
        } else {
          alert(v?.message);
          // alert(v?.message);
        }
      },
    });
  }
  getProfileData() {
    this.apiService.getUserProfile().subscribe((res) => {
      console.log(res);
      sessionStorage.setItem('SenderUserId', res?.data?.id);
      sessionStorage.setItem(
        'profileWalletNo',
        res?.data?.walletAccount?.walletNo
      );
      this.dataSharing.walletNoData(res?.data);
      sessionStorage.setItem('userType', res?.data?.userType);
      sessionStorage.setItem('agentType', res?.data?.agentType);
      sessionStorage.setItem('email', res?.data?.email);
      this.dataSharing.kycSignUp(res?.data);
      this.dataSharing.agentTypeSignUp(res?.data?.agentType);
      this.apiService
        .getPayFromAccountDetails(res?.data?.walletAccount?.walletNo)
        .subscribe((res) => {
          console.log(res);
          sessionStorage.setItem('WalletAmount', res?.data);
          this.dataSharing.currentBalanceData(res?.data);
        });
    });
  }
  openModal: boolean = true;

  otp: any;
  value: any = true;
  closeModal() {
    this.openModal = false;
  }

  gotoSignUp(v: any) {
    console.log(v);
    this.value = v;
    // this.currentView = 'signUp'
  }

  showSignup: boolean = false;
  navigate(sign: any) {
    this.showSignup = sign;
    // this.router.navigateByUrl('signUp');
    this.dataSharing.show();
  }

  switchView(
    view: 'login' | 'forgotPassword' | 'otpVerification' | 'newPassword'
  ) {
    this.currentView = view;
  }

  pwdReset() {
    let body = {
      email: this.email,
      password: this.newPassword,
    };
    console.log(body);

    this.dataSharing.show();
    this.apiServic.forgotPwd(body).subscribe((res) => {
      if (res?.responseCode == 200) {
        alert('Password Reset Successful');
        this.spinner.hide();
        // this.otpVerify = false
        this.resetPwdData = false;
        // this.resetPwd = false;
        setTimeout(() => {
          this.value = true;
          this.currentView = 'login';
          console.log('Current View after password reset:', this.currentView);
          // this.cdr.detectChanges();
        }, 0);
      } else {
        this.spinner.hide();
        alert('Error Try Again');
      }
    });
  }

  data: any = true;
  resetPwdData: any = false;
  resetPwd: boolean = true;
  loginformData: boolean = true;
  sendOtp() {
    let body = {
      email: this.email,
    };
    this.dataSharing.show();
    this.apiServic.generateOtp(body).subscribe((res) => {
      if (res?.responseCode == 200) {
        this.spinner.hide();
        this.otpVerify = false;
        this.resetPwd = false;
        this.loginformData = false;
        this.otpVerify = true;
        this.value = false;
        alert('OTP has sent to your mail');
      } else {
        this.spinner.hide();
        alert('Error Try Again!!!');
      }
    });
  }
  onSaveOtp() {
    let email = this.email;

    let body = {
      email: email,
      otp: this.otp,
    };
    this.apiServic.verifyOtp(body).subscribe((res) => {
      console.log(res);
      if (res?.responseCode == 200) {
        this.resetPwdData = true;
        this.otpVerify = false;
        this.resetPwdData = true;
        // this.loginformData = false

        this.spinner.hide();
        alert('OTP Verified Successfully');
      } else {
        alert(res?.error);
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    /*  this.authService.loggedIn.next(false);
    this.authService.logged = false; */
  }

  //------------------------------------------------------------------------------//
}
