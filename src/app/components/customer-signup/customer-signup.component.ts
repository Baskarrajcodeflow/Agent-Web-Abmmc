import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../../ApiService/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';
import { SharedFunctionsService } from '../../services/shared-functions.service';

@Component({
  selector: 'app-customer-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.scss'
})
export class CustomerSignupComponent {
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
        customerGender: FormControl<string | null>;
        customerEmail: FormControl<string | null>;
        phone: FormControl<string | null>;
        password: FormControl<string | null>;
        dateOfBirth :FormControl<string | null>;
        birthCountry:FormControl<string | null>;
        birthProvince:FormControl<string | null>;
        birthDistrict:FormControl<string | null>;
    currCountry:FormControl<string | null>;
    currProvince:FormControl<string | null>;
    currDistrict:FormControl<string | null>;
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
  Currnationalities: any;
  Currprovinces: any;
  Currdistricts: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dataSgaring: DatasharingService,
    private router:Router,
    private sharedFunctionsServic:SharedFunctionsService
  ) {}
  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });

    this.initForm();
    this.getCountries();
    this.getDistricts;
    this.getProvinces();
    this.getCurrCountries();
    this.getCurrDistricts;
    this.getCurrProvinces();
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
  onSelectCurrProvince($event: any) {
    let provinceId = $event.target.value;
    let selectedProvinceName;
    const filteredProvinces = this.Currprovinces.filter(
      (province: any) => province.name === provinceId
    );
    if (filteredProvinces && filteredProvinces.length > 0) {
      selectedProvinceName = filteredProvinces[0].id;
    }
    this.getCurrDistricts(selectedProvinceName);
  }
  getDistricts(provinceId: number) {
    this.apiService.getdistricts(provinceId).subscribe({
      next: (data: any) => {
        this.districts = data?.data;
      },
    });
  }
  getCurrDistricts(provinceId: number) {
    this.apiService.getdistricts(provinceId).subscribe({
      next: (data: any) => {
        this.Currdistricts = data?.data;
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
  getCurrCountries() {
    this.apiService.getCountries().subscribe({
      next: (data: any) => {
        this.Currnationalities = data?.data;
      },
    });
  }

  getCurrProvinces() {
    this.apiService.getprovinces().subscribe({
      next: (data: any) => {
        this.Currprovinces = data?.data;
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
     
          //customerMMWallet : ['', Validators.required],
          customerGender: ['', Validators.required],
     
          customerEmail: [
            '',
            [
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
            ],
          ],
          phone: ['', [Validators.required, Validators.pattern(/.*(7\d{8})$/)]],
          password: ['', Validators.required],
          dateOfBirth: ['', [Validators.required, this.sharedFunctionsServic.ageValidator()]],
          birthCountry: ['', Validators.required],
          birthProvince: ['', Validators.required],
          birthDistrict: ['', Validators.required],
    currCountry: ['', Validators.required],
    currProvince: ['', Validators.required],
    currDistrict: ['', Validators.required],
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
      userType: 'CUSTOMER',
      password: this.identityDetailsForm.value.password,
      gender: this.identityDetailsForm.value.customerGender,
      dateOfBirth: this.identityDetailsForm.value.dateOfBirth,
      birthCountry: this.identityDetailsForm.value.birthCountry,
      birthProvince: this.identityDetailsForm.value.birthProvince,
      birthDistrict: this.identityDetailsForm.value.birthDistrict,
      currCountry: this.identityDetailsForm.value.currCountry,
      currProvince: this.identityDetailsForm.value.currProvince,
      currDistrict: this.identityDetailsForm.value.currDistrict,
    };
    console.log(request);
    
    this.isLoading = true;
    this.apiService.verifyOtp(body).subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          this.isLoading = true;
          this.apiService.customerKYCRegister(request).subscribe({
            next: (res) => {
              if (res?.responseCode == 200) {
                alert('Customer Registration Success')
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
        } else {
          this.isLoading = false;
          alert(res?.error);
        }
      },
      error: () => {
        alert('Error Try Again');
      },
    });
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
  validateNumberInput(event: KeyboardEvent) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
        }
      }
  phoneError: string | null = null;
  emailError: string | null = null;
    checkPhoneExistence() {
      const phone = this.identityDetailsForm.get('phone')?.value;
  
      if (phone) {
        this.apiService.checkPhoneExist(phone).subscribe(
          (response: any) => {
            if (response && response.data) {
              // Check if email matches any record with user type 'CUSTOMER'
              const customerMatch = response.data.length > 0
  
              if (customerMatch) {
                this.phoneError = 'Phone number is already registered.';
              } else {
                this.phoneError = null; // Clear the error message if no match is found
              }
            }
          },
          (error) => {
            console.error('Error checking phone existence:', error);
          }
        );
      }
    }

    checkEmailExistence() {
      const email = this.identityDetailsForm.get('customerEmail')?.value;
  
      if (email) {
        this.apiService.checkEmailExist(email).subscribe(
          (response: any) => {
            if (response && response.data) {
              // Check if email matches any record with user type 'CUSTOMER'
              const customerMatch = response.data.length > 0
  
              if (customerMatch) {
                this.emailError = 'Email is already registered.';
              } else {
                this.emailError = null; // Clear the error message if no match is found
              }
            }
          },
          (error) => {
            console.error('Error checking email existence:', error);
          }
        );
      }
    }
  cancel(){
    this.router.navigateByUrl('/howtobecome')
  }
}
