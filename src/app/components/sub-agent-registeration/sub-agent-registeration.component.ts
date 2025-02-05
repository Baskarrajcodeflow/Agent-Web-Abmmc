import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../ApiService/api.service';
import { CommonModule } from '@angular/common';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { KycService } from '../customer-kyc/kyc.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-sub-agent-registeration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './sub-agent-registeration.component.html',
  styleUrl: './sub-agent-registeration.component.scss'
})
export class SubAgentRegisterationComponent {
  isLoading: boolean = false;
   isPasswordVisible: boolean = false;
   otp: any;
   otpVerify: boolean = false;
   nationalities: any;
   provinces: any;
   districts: any;
   identityDetailsForm!: FormGroup<{
     customerFirstName: FormControl<string | null>;
     customerLastName: FormControl<string | null>;
     customerFatherName: FormControl<string | null>;
     customerDOB: FormControl<string | null>;
     customerGender: FormControl<string | null>;
     customerMaritialStatus: FormControl<string | null>;
     customerEmail: FormControl<string | null>;
     customerAlternatePhone: FormControl<string | null>;
     customerNationality: FormControl<string | null>;
     customerBirthCountry: FormControl<string | null>;
     customerBirthProvince: FormControl<string | null>;
     employmentType: FormControl<string | null>;
     idType: FormControl<string | null>;
     phone: FormControl<string | null>;
     password: FormControl<string | null>;
   }>;
 
   addressDetailsForm!: FormGroup<{
     currentLocation: FormControl<string | null>;
     currentDistrict: FormControl<string | null>;
     currentProvince: FormControl<string | null>;
     currentCountry: FormControl<string | null>;
     permanantDistrict: FormControl<string | null>;
     permanantProvince: FormControl<string | null>;
     permanantCountry: FormControl<string | null>;
   }>;
   occupationDetailsForm: any;
   nextOfKinDetailsForm!: FormGroup<{ fullName: FormControl<string | null>; fatherName: FormControl<string | null>; relationship: FormControl<string | null>; phoneNumber: FormControl<string | null>; location: FormControl<string | null>; }>;
   proofsDetailsForm!: any;
 
   otpForm!: FormGroup<{
     otp: FormControl<any | null>;
   }>;
   customerId: any;
   constructor(
     private fb: FormBuilder,
     private apiService: ApiService,
     private dataSgaring: DatasharingService,
     private router:Router
   ) {}
   ngOnInit(): void {
     this.otpForm = this.fb.group({
       otp: ['', [Validators.required]],
     });
 
     this.initForm();
     this.getCountries();
     this.getDistricts;
     this.getProvinces();
   }
   onSelectProvince($event: any) {
     let provinceId = $event.target.value;
     let selectedProvinceName;
     const filteredProvinces = this.provinces.filter(
       (province: any) => province.name === provinceId
     );
     if (filteredProvinces && filteredProvinces.length > 0) {
       selectedProvinceName = filteredProvinces[0].id;
     }
     this.getDistricts(selectedProvinceName);
   }
   getDistricts(provinceId: number) {
     this.apiService.getdistricts(provinceId).subscribe({
       next: (data: any) => {
         this.districts = data?.data;
       },
     });
   }
 
   getCountries() {
     this.apiService.getCountries().subscribe({
       next: (data: any) => {
         this.nationalities = data?.data;
       },
     });
   }
 
   getProvinces() {
     this.apiService.getprovinces().subscribe({
       next: (data: any) => {
         this.provinces = data?.data;
       },
     });
   }
   initForm() {
     this.identityDetailsForm = this.fb.group({
       customerFirstName: [
         '',
         [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
       ],
       customerLastName: [
         '',
         [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
       ],
       customerFatherName: [
         '',
         [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
       ],
       //customerMMWallet : ['', Validators.required],
       customerDOB: ['', [Validators.required, this.ageValidator()]],
       customerGender: ['', Validators.required],
       customerMaritialStatus: ['', Validators.required],
 
       customerEmail: [
         '',
         [
           Validators.required,
           Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
         ],
       ],
       customerAlternatePhone: [
         '',
         [Validators.required, Validators.pattern(/.*(7\d{8})$/)],
       ],
       customerNationality: ['', Validators.required],
       customerBirthCountry: ['', Validators.required],
       customerBirthProvince: ['', Validators.required],
       employmentType: ['', Validators.required],
       idType: ['', Validators.required],
       phone: ['', [Validators.required, Validators.pattern(/.*(7\d{8})$/)]],
       password: ['', Validators.required],
     });
 
     this.addressDetailsForm = this.fb.group({
       currentLocation: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]], // Alphanumeric
       currentProvince: ['', [Validators.required]],
       currentDistrict: ['', [Validators.required]],
       currentCountry: ['', [Validators.required]],
       permanantDistrict: ['', [Validators.required]],
       permanantProvince: ['', [Validators.required]],
       permanantCountry: ['', [Validators.required]],
       //addressProof: ['', [Validators.required]],
     }),
 
     this.occupationDetailsForm = this.fb.group({}),
     this.nextOfKinDetailsForm = this.fb.group({
       fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
       fatherName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
       relationship: ['', Validators.required],
       phoneNumber: ['', [Validators.required, Validators.pattern(/.*(7\d{8})$/)]],
       location: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]],
     })
 
     this.proofsDetailsForm = this.fb.group({})
 
   }
 
   ageValidator(): (control: AbstractControl) => ValidationErrors | null {
     return (control: AbstractControl): ValidationErrors | null => {
       if (!control.value) {
         return null; // Don't validate empty values
       }
 
       const today = new Date();
       const birthDate = new Date(control.value);
       const age = today.getFullYear() - birthDate.getFullYear();
       const monthDifference = today.getMonth() - birthDate.getMonth();
 
       const isUnderage = age < 18 || (age === 18 && monthDifference < 0);
 
       return isUnderage ? { underage: { value: control.value } } : null;
     };
   }
   togglePasswordVisibility() {
     this.isPasswordVisible = !this.isPasswordVisible;
   }
   createPayload() {
     let email = this.identityDetailsForm.controls['customerEmail'].value;
     let body = {
       email: email,
       otp: this.otpForm.controls['otp'].value,
     };
     this.isLoading = true;
     let request = {
       email: this.identityDetailsForm.value.customerEmail,
       username: this.identityDetailsForm.value.customerEmail,
       firstName: this.identityDetailsForm.value.customerFirstName,
       lastName: this.identityDetailsForm.value.customerLastName,
       phone: this.identityDetailsForm.value.phone,
       userType: 'AGENT',
       agentType: 'SUBAGENT',
       password: this.identityDetailsForm.value.password,
       gender: this.identityDetailsForm.value.customerGender,
     };
     this.isLoading = true;
     this.apiService.b2bSignIp(request).subscribe({
       next: (res) => {
         if (res) {
           alert('Agent Registration Success')
           this.isLoading = false;
           this.customerId = res?.id;
           this.router.navigateByUrl('/howtobecome')
         } else {
           this.isLoading = false;
           alert(res?.error);
         }
       },
       error: () => {
         this.isLoading = false;
         alert('Something Went Wrong!!!');
       },
     });
    //  this.apiService.verifyOtp(body).subscribe({
    //    next: (res) => {
    //      if (res?.responseCode == 200) {
    //        this.isLoading = true;
    //      } else {
    //        this.isLoading = false;
    //        alert(res?.error);
    //      }
    //    },
    //    error: () => {
    //      alert('Error Try Again');
    //    },
    //  });
   }
   sendOtp() {
     let body = {
       email: this.identityDetailsForm.controls['customerEmail'].value,
     };
     this.apiService.generateOtp(body).subscribe({
       next: (res) => {
         if (res?.responseCode == 200) {
           alert('OTP has sent to you Email.Please Verify.');
           this.otpVerify = true;
         } else {
           alert('Error Try Again');
         }
       },
       error: () => {
         alert('Error Try Again');
       },
     });
   }
 
   // gotoLogin() {
   //   this.dataSgaring.corpKycData(false);
   // }

   cancel(){
    this.router.navigateByUrl('/howtobecome')
  }
 }
 