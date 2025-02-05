import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { KycService } from './kyc.service';
import { SignupComponent } from "../signup/signup.component";
import { ApiService } from '../../ApiService/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-customer-kyc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignupComponent,SpinnerComponent],
  templateUrl: './customer-kyc.component.html',
  styleUrl: './customer-kyc.component.scss',
})
export class CustomerKycComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  public corporateForm: FormGroup = new FormGroup({});
  public basicUsername: FormControl = new FormControl('', [Validators.required,]);

  public accType: FormControl = new FormControl('');
  public basicFirstName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public basicLastName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public basicFatherName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public basicwallet: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public idType: FormControl = new FormControl('', [Validators.required]);
  public idNO: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public issueDate: FormControl = new FormControl('', [Validators.required]);
  public expiryDate: FormControl = new FormControl('', [Validators.required]);
  public dob: FormControl = new FormControl('', this.ageValidator());
  public placeOfBirth: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public country: FormControl = new FormControl('', [Validators.required]);
  public province: FormControl = new FormControl('', [Validators.required]);
  public genderInfo: FormControl = new FormControl('', [Validators.required]);
  public marital: FormControl = new FormControl('', [Validators.required]);
  public nationality: FormControl = new FormControl('', [Validators.required]);
  public basicPhone: FormControl = new FormControl('', [Validators.required, Validators.pattern(/.*(7\d{8})$/)]);
  public basicEmail1: FormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]);
  public accOpenDate: FormControl = new FormControl('', [Validators.required]);
  public PTID: FormControl = new FormControl('', [Validators.pattern('^[0-9]+$')]);
  public accPurpose: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public basicPassword: FormControl = new FormControl('', [Validators.required]);

  public firstName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public father: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public pos: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public last: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public tazkira: FormControl = new FormControl('', [Validators.required]);
  public position: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public licenseNo: FormControl = new FormControl('', [Validators.required]);
  public ICCID: FormControl = new FormControl('', [Validators.required]);
  public incomeSource: FormControl = new FormControl('', [Validators.required]);
  public monthlyIncome: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public basicGender: FormControl = new FormControl('', [Validators.required]);
  public accountDate: FormControl = new FormControl('', [Validators.required]);
  public basicEmail: FormControl = new FormControl('', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]);

  public superType: FormControl = new FormControl('');
  public locationAddress: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public countryAddress: FormControl = new FormControl('', [Validators.required]);
  public provinceAddress: FormControl = new FormControl('', [Validators.required]);
  public districtAddress: FormControl = new FormControl('', [Validators.required]);
  public streetAddress: FormControl = new FormControl('', [Validators.required]);
  public districtTextCur: FormControl = new FormControl('', [Validators.required]);
  public provinceTextCur: FormControl = new FormControl('', [Validators.required]);

  public permanentHouseNo: FormControl = new FormControl('', [Validators.required]);
  public permanentLocation: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public permanentCountry: FormControl = new FormControl('', [Validators.required]);
  public permanentProvince: FormControl = new FormControl('', [Validators.required]);
  public permanentDistrict: FormControl = new FormControl('', [Validators.required]);
  public permanentStreet: FormControl = new FormControl('', [Validators.required]);
  public provinceTextPer: FormControl = new FormControl('', [Validators.required]);
  public districtTextPer: FormControl = new FormControl('', [Validators.required]);

  public MMacc: FormControl = new FormControl('', [Validators.required]);

  public incomeSourceOrg: FormControl = new FormControl('');
  public ShopName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public positionorg: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public natureOfBusiness: FormControl = new FormControl('', [Validators.pattern('^[0-9]+$')]);
  public address: FormControl = new FormControl('', [Validators.required]);
  public monthlyIncomeorg: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public activity: FormControl = new FormControl('', [Validators.required]);
  public TurnoverOrg: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  public tinOrg: FormControl = new FormControl('', [Validators.pattern('^[0-9]+$')]);

  public haveOtherAccounts: FormControl = new FormControl('');
  public EMIname: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public accountName: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public accountNo: FormControl = new FormControl('', [Validators.required]);

  public fatherKin: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public nameKin: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public numberKin: FormControl = new FormControl('', [Validators.required, Validators.pattern(/.*(7\d{8})$/)]);
  public relationship: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);
  public kinAddress: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]);

  public nameUndertaken: FormControl = new FormControl('', [Validators.required]);
  public dateUndertaken: FormControl = new FormControl('');
  public undertakenSign: FormControl = new FormControl('');

  showBasicInfo: boolean = true;
  showBusiness: boolean = false;
  showOrg: boolean = false
  showRemittance: boolean = false
  showCompanyPres: boolean = false
  showCompanyCurrent: boolean = false
  showCompanyPermanent: boolean = false;
  showCompanyVice: boolean = false;
  showCompanyViceCurrent: boolean = false;
  showCompanyVicePermanent: boolean = false;
  showMNO: boolean = false;
  showUndertaken: boolean = false;
  showDoc: boolean = false;
  showAbmmc: boolean = false;
  nationalities: any;
  provinces: any;
  districts: any;
  provinceId: any;
  selectedProvinceName: any;
  uploadedImage: any;
  uploadedImageSign: any;
  uploadedImagePres: any;
  uploadedImageVice: any;
  uploadedImageCom: any;
  uploadedImageOp: any;
  currentPage: number = 1;
  uploadedImageAuth: any;
  uploadedImageKyc: any;
  type!: string;
  photoId: any;
  uploadedImageUndertaken: any;
  uploadedImageFileName: any;
  uploadedImageFileType1: any;
  uploadedImageFileNameExtension: any;
  uploadedImageFileData: any;
  showCurDisText: boolean = false;
  showCurDisDrop: boolean = true;
  showCurProText: boolean = false;
  showCurProDrop: boolean = true;
  countryNameCur: any;
  showPerProDrop: boolean = true;
  showPerProText: boolean = false;
  showPerDisDrop: boolean = true;
  showPerDisText: boolean = false;
  countryNamePer: any;
  showPassword = false;
  submitterForId: any;
  EMIvalue: any;
  showEMIdetails: boolean = false;
  currentDate!: string;
  uploadedImageUser: any;
  uploadedImageDigSign: any;
  uploadedImageFileNameeDigSign: any;
  uploadedImageDocFront: any;
  uploadedImageFileNameDocFront: any;
  uploadedImageDocBack: any;
  uploadedImageFileNameDocBack: any;
  uploadedImageLicense: any;
  uploadedImageFileNameLicense: any;
  uploadedImageAddress: any;
  uploadedImageFileNameAddress: any;
  uploadedImageTin: any;
  uploadedImageFileNametin: any;

  constructor(private corporate: ApiService) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    console.log("formattedDate", this.currentDate)
    this.initForm();
    this.getCountries();
    this.getDistricts
    this.getProvinces();
  }

  private initForm() {
    this.corporateForm.addControl('accType', this.accType);
    this.corporateForm.addControl('basicFirstName', this.basicFirstName);
    this.corporateForm.addControl('basicLastName', this.basicLastName);
    this.corporateForm.addControl('basicFatherName', this.basicFatherName);
    this.corporateForm.addControl('basicwallet', this.basicwallet);
    this.corporateForm.addControl('idType', this.idType);
    this.corporateForm.addControl('idNO', this.idNO);
    this.corporateForm.addControl('issueDate', this.issueDate);
    this.corporateForm.addControl('expiryDate', this.expiryDate);
    this.corporateForm.addControl('dob', this.dob);
    this.corporateForm.addControl('placeOfBirth', this.placeOfBirth);
    this.corporateForm.addControl('country', this.country);
    this.corporateForm.addControl('province', this.province);
    this.corporateForm.addControl('genderInfo', this.genderInfo);
    this.corporateForm.addControl('marital', this.marital);
    this.corporateForm.addControl('nationality', this.nationality);

    this.corporateForm.addControl('basicPhone', this.basicPhone);
    this.corporateForm.addControl('basicEmail1', this.basicEmail1);
    this.corporateForm.addControl('accOpenDate', this.accOpenDate);
    this.corporateForm.addControl('PTID', this.PTID);
    this.corporateForm.addControl('accPurpose', this.accPurpose);
    this.corporateForm.addControl('basicPassword', this.basicPassword);


    this.corporateForm.addControl('firstName', this.firstName);
    this.corporateForm.addControl('father', this.father);
    this.corporateForm.addControl('pos', this.pos);
    this.corporateForm.addControl('last', this.last);
    this.corporateForm.addControl('tazkira', this.tazkira);
    this.corporateForm.addControl('position', this.position);

    this.corporateForm.addControl('licenseNo', this.licenseNo);
    this.corporateForm.addControl('ICCID', this.ICCID);
    this.corporateForm.addControl('expiryDate', this.expiryDate);
    this.corporateForm.addControl('incomeSource', this.incomeSource);
    this.corporateForm.addControl('PTID', this.PTID);
    this.corporateForm.addControl('monthlyIncome', this.monthlyIncome);
    this.corporateForm.addControl('basicGender', this.basicGender);
    this.corporateForm.addControl('accountDate', this.accountDate);
    this.corporateForm.addControl('basicEmail', this.basicEmail);

    this.corporateForm.addControl('locationAddress', this.locationAddress);
    this.corporateForm.addControl('provinceAddress', this.provinceAddress);
    this.corporateForm.addControl('streetAddress', this.streetAddress);
    this.corporateForm.addControl('districtAddress', this.districtAddress);
    this.corporateForm.addControl('countryAddress', this.countryAddress);
    this.corporateForm.addControl('districtTextCur', this.districtTextCur);
    this.corporateForm.addControl('provinceTextCur', this.provinceTextCur);

    this.corporateForm.addControl('permanentHouseNo', this.permanentHouseNo);
    this.corporateForm.addControl('permanentLocation', this.permanentLocation);
    this.corporateForm.addControl('permanentProvince', this.permanentProvince);
    this.corporateForm.addControl('permanentStreet', this.permanentStreet);
    this.corporateForm.addControl('permanentDistrict', this.permanentDistrict);
    this.corporateForm.addControl('permanentCountry', this.permanentCountry);
    this.corporateForm.addControl('provinceTextPer', this.provinceTextPer);
    this.corporateForm.addControl('districtTextPer', this.districtTextPer);

    this.corporateForm.addControl('MMacc', this.MMacc);

    this.corporateForm.addControl('incomeSourceOrg', this.incomeSourceOrg);
    this.corporateForm.addControl('ShopName', this.ShopName);
    this.corporateForm.addControl('positionorg', this.positionorg);
    this.corporateForm.addControl('natureOfBusiness', this.natureOfBusiness);
    this.corporateForm.addControl('address', this.address);
    this.corporateForm.addControl('monthlyIncomeorg', this.monthlyIncomeorg);
    this.corporateForm.addControl('activity', this.activity);
    this.corporateForm.addControl('TurnoverOrg', this.TurnoverOrg);
    this.corporateForm.addControl('tinOrg', this.tinOrg);

    this.corporateForm.addControl('haveOtherAccounts', this.haveOtherAccounts);
    this.corporateForm.addControl('EMIname', this.EMIname);
    this.corporateForm.addControl('accountName', this.accountName);
    this.corporateForm.addControl('accountNo', this.accountNo);

    this.corporateForm.addControl('fatherKin', this.fatherKin);
    this.corporateForm.addControl('nameKin', this.nameKin);
    this.corporateForm.addControl('numberKin', this.numberKin);
    this.corporateForm.addControl('relationship', this.relationship);
    this.corporateForm.addControl('kinAddress', this.kinAddress);

    //auth person
    // this.corporateForm.addControl('firstNameAuth', this.firstNameAuth);
    // this.corporateForm.addControl('lastNameAuth', this.lastNameAuth);
    // this.corporateForm.addControl('fatherNameAuth', this.fatherNameAuth);
    // this.corporateForm.addControl('positionAuth', this.positionAuth);
    // this.corporateForm.addControl('emailAuth', this.emailAuth);
    // this.corporateForm.addControl('tazkiraAuth', this.tazkiraAuth);
    // this.corporateForm.addControl('TinAuth', this.TinAuth);
    // this.corporateForm.addControl('dobAuth', this.dobAuth);
    // this.corporateForm.addControl('countryAuth', this.countryAuth);
    // this.corporateForm.addControl('incomeSourceAuth', this.incomeSourceAuth);
    // this.corporateForm.addControl('issueDateAuth', this.issueDateAuth);
    // this.corporateForm.addControl('DateofExpiryAuth', this.DateofExpiryAuth);
    // this.corporateForm.addControl('nationalityAuth', this.nationalityAuth);
    // this.corporateForm.addControl('monthlyIncomeAuth', this.monthlyIncomeAuth);
    // this.corporateForm.addControl('mobileAuth', this.mobileAuth);
    //auth person
    this.corporateForm.addControl('nameUndertaken', this.nameUndertaken);
    this.corporateForm.addControl('dateUndertaken', this.dateUndertaken);
    this.corporateForm.addControl('undertakenSign', this.undertakenSign);

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
  onChangeCountryCur($event: any) {
    this.countryNameCur = $event.target.value
    if (this.countryNameCur === 'Afghanistan') {
      this.showCurProText = false
      this.showCurDisText = false
      this.showCurDisDrop = true
      this.showCurProDrop = true
    }
    else {
      this.showCurProText = true
      this.showCurDisText = true
      this.showCurDisDrop = false
      this.showCurProDrop = false
    }
  }
  onChangeCountryPer($event: any) {
    this.countryNamePer = $event.target.value
    if (this.countryNamePer === 'Afghanistan') {
      this.showPerProText = false
      this.showPerDisText = false
      this.showPerProDrop = true
      this.showPerDisDrop = true
    }
    else {
      this.showPerProText = true
      this.showPerDisText = true
      this.showPerProDrop = false
      this.showPerDisDrop = false
    }
  }
  onSelectEMI($event: any) {
    this.EMIvalue = $event.target.value
    if (this.EMIvalue == "1") {
      this.showEMIdetails = true
    }
    else {
      this.showEMIdetails = false
    }
  }
  //new
  isCurrentPageValid(): boolean {
    switch (this.currentPage) {

      case 1:
        return this.accType.value &&
          this.basicFirstName.value &&
          this.basicLastName.value &&
          this.basicFatherName.value &&
          // this.basicwallet.value &&
          this.idType.value &&
          this.idNO.value &&
          this.issueDate.value &&
          this.expiryDate.value &&
          this.dob.value &&
          this.placeOfBirth.value &&
          this.country.value &&
          this.province.value &&
          this.genderInfo.value &&
          this.marital.value &&
          this.nationality.value &&
          this.basicPhone.value &&
          this.basicEmail1.value &&
          // this.accOpenDate.value &&
          this.accPurpose.value &&
          this.basicPassword.value;
      case 2:
        const provinceCurIsValid = this.showCurProDrop ? this.corporateForm.get('provinceAddress')?.value : this.corporateForm.get('provinceText')?.value;
        const districtCurIsValid = this.showCurDisDrop ? this.corporateForm.get('districtAddress')?.value : this.corporateForm.get('showCurDisText')?.value;
        return this.locationAddress.value &&
          this.countryAddress.value &&
          provinceCurIsValid &&
          districtCurIsValid;
      case 3:
        const provincePerIsValid = this.showPerProDrop ? this.permanentProvince.value : this.provinceTextPer.value;
        const districtPerIsValid = this.showPerDisDrop ? this.permanentDistrict.value : this.districtTextPer.value;
        return provincePerIsValid &&
          districtPerIsValid &&
          this.permanentCountry.value;
      case 4:
        return this.incomeSourceOrg.value &&
          this.ShopName.value &&
          this.address.value &&
          this.positionorg.value &&
          this.natureOfBusiness.value &&
          this.monthlyIncomeorg.value &&
          this.TurnoverOrg.value

      case 5:
        if (this.EMIvalue == "1") {
          return this.EMIname.value &&
            this.accountName.value &&
            this.accountNo.value;
        }
        else {
          return this.haveOtherAccounts.value;
        }
      case 6:
        return this.nameKin.value &&
          this.fatherKin.value &&
          this.numberKin.value &&
          this.relationship.value &&
          this.kinAddress.value;

      case 7:
        return this.undertakenSign.value;
      // this.nameUndertaken.value &&
      //   this.dateUndertaken.value;
      // this.issueDate.value &&
      // this.expiryDate.value;
      default:
        return false;
    }
  }
  //new
  nextPage() {
    switch (this.currentPage) {
      case 1:
        this.callAgentRegisterAPI();
        break;
      case 2:
        this.callCurrentAPI();
        break;
      case 3:
        this.callPermAPI();
        break;
      case 4:
        this.callOrgAPI();
        break;
      case 5:
        this.callEmiAPI();
        break;
      case 6:
        this.callKinAPI();
        break;
      case 7:
        this.callFinalAPI();
        break;
    }
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
    }
  }

  getCountries() {
    this.corporate.getCountries().subscribe({
      next: (data: any) => {
        this.nationalities = data?.data;
      }
    });
  }

  getProvinces() {
    this.corporate.getprovinces().subscribe({
      next: (data: any) => {
        this.provinces = data?.data;
      }
    });
  }
  onSelectProvince($event: any) {
    this.provinceId = $event.target.value;
    const filteredProvinces = this.provinces.filter((province: any) => province.name === this.provinceId);
    if (filteredProvinces && filteredProvinces.length > 0) {
      this.selectedProvinceName = filteredProvinces[0].id;
    }
    this.getDistricts(this.selectedProvinceName);
  }
  getDistricts(provinceId: number) {
    this.corporate.getdistricts(provinceId).subscribe({
      next: (data: any) => {
        this.districts = data?.data;
      }
    });
  }

  detectFilesPhoto(event: any) {
    // if (event.target.files && event.target.files[0]) {
    //   this.uploadedImage = event.target.files[0];
    //   this.uploadedImageFile0 = event.target.files[0].name;
    //   this.uploadedImageFileType0 = event.target.files[0].type
    //   this.uploadedImageFileNameExtension0 = event.target.files[0].name.split('.').pop();
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   this.uploadedImageFileData0 = reader.result;
    //   reader.onload = () => {
    //     this.uploadedImageFileData0 = reader.result;
    //   };
    // }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedImage = input.files[0];
      // Handle file upload here
      // For example, you can use a service to upload the file and update `agentImg`
      console.log(this.uploadedImage);
    }

  }
  detectFilesUserPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageUser = event.target.files[0];
      // console.log("uploadedImage1", this.uploadedImage1);
      this.uploadedImageFileName = event.target.files[0].name;
      this.uploadedImageFileType1 = event.target.files[0].type
      this.uploadedImageFileNameExtension = event.target.files[0].name.split('.').pop();
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.uploadedImageFileData = reader.result;
      reader.onload = () => {
        this.uploadedImageFileData = reader.result;
      };
    }
    // this.corporate.addAgentPhoto(this.uploadedImageUser, "agentPhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesSign(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageDigSign = event.target.files[0];
      this.uploadedImageFileNameeDigSign = event.target.files[0].name;
    }
    // this.corporate.addAgentDigSign(this.uploadedImageDigSign, "agentSignaturePhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesDocFront(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageDocFront = event.target.files[0];
      this.uploadedImageFileNameDocFront = event.target.files[0].name;
    }
    // this.corporate.addAgentDocFront(this.uploadedImageDocFront, "custProofFrontPhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesDocBack(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageDocBack = event.target.files[0];
      this.uploadedImageFileNameDocBack = event.target.files[0].name;
    }
    // this.corporate.addAgentDocBack(this.uploadedImageDocBack, "custProofBackPhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesLicense(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageLicense = event.target.files[0];
      this.uploadedImageFileNameLicense = event.target.files[0].name;
    }
    // this.corporate.addAgentLicense(this.uploadedImageLicense, "bizOrGovtLicensePhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesAddressProof(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageAddress = event.target.files[0];
      this.uploadedImageFileNameAddress = event.target.files[0].name;
    }
    // this.corporate.addAgentAddressProof(this.uploadedImageAddress, "addressProofPhoto", this.submitterForId).subscribe((data: any) => {
    // })
  }
  detectFilesTINLetter(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.uploadedImageTin = event.target.files[0];
      this.uploadedImageFileNametin = event.target.files[0].name;
    }
    this.corporate.addAgentTin(this.uploadedImageTin, "tinLetterPhoto", this.submitterForId).subscribe((data: any) => {
    })
  }
  onCancel() {
    this.cancel.emit();
  }
  getProvinceCurValue(): string {
    return this.showCurProText ? this.corporateForm.get('provinceTextCur')?.value : this.corporateForm.get('provinceAddress')?.value;
  }
  getDistrictCurValue(): string {
    return this.showCurDisText ? this.corporateForm.get('districtTextCur')?.value : this.corporateForm.get('districtAddress')?.value;
  }
  //
  getProvincePerValue(): string {
    return this.showPerProText ? this.corporateForm.get('provinceTextPer')?.value : this.corporateForm.get('permanentProvince')?.value;
  }
  getDistrictPerValue(): string {
    return this.showPerDisText ? this.corporateForm.get('districtTextPer')?.value : this.corporateForm.get('permanentDistrict')?.value;
  }
  callAgentRegisterAPI() {
    let req = {
      accountType: this.accType.value,
      custInfoFirstName: this.basicFirstName.value,
      custInfoLastName: this.basicLastName.value,
      custInfoFatherName: this.basicFatherName.value,
      custInfoMMWallet: this.basicwallet.value,
      custProofType: this.idType.value,
      custProofNumber: this.idNO.value,
      custProofDateOfIssue: this.issueDate.value,
      custProofDateOfExpiry: this.expiryDate.value,
      tazkiraPageNo: this.basicEmail1.value,
      tazkiraRegNo: "not",
      tazkiraBookNo: "not",
      custInfoDob: this.dob.value,
      custInfoBirthCountry: this.country.value,
      custInfoBirthProvince: this.province.value,
      custInfoGender: this.genderInfo.value,
      custInfoMaritalStatus: this.marital.value,
      custInfoNationality: this.nationality.value,
      custInfoPhoneNumber: this.basicPhone.value,
      custInfoEmail: this.basicEmail1.value,
      custInfoAccOpenDate: this.currentDate,
      custInfoPTID: this.PTID.value,
      custInfoPurposeOfAcc: this.accPurpose.value,

    }
    this.corporate.agentRegister(req).subscribe((data: any) => {
      this.submitterForId = data?.id
    })
  }
  callBasicAPI() {
    let selectedGender = this.basicGender.value;
    let custInfoMale = selectedGender === '1' ? '1' : "null";
    let custInfoFemale = selectedGender === '2' ? '1' : "null";
    //
    let maritalValue = this.marital.value;
    let custInfoSingle = maritalValue === '1' ? '1' : "null";
    let custInfoMarried = maritalValue === '2' ? '1' : "null";

  }
  callCurrentAPI() {
    let reqCurrent = {
      kycInputs: {
        // currLocation: this.locationAddress.value,
        // currProvince: this.getProvinceCurValue(),
        // currStreet: this.streetAddress.value,
        // currDistrict: this.getDistrictCurValue(),
        // currCountry: this.countryAddress.value,

        currLocation: this.locationAddress.value,
        currStreet: this.streetAddress.value,
        currCountry: this.countryAddress.value,
        currProvince: this.getProvinceCurValue(),
        currProvinceId: "not",
        currDistrict: this.getDistrictCurValue(),
        currDistrictId: "not",
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentUpdate(reqCurrent).subscribe((data: any) => {
    })
  }
  callPermAPI() {
    let reqPerm = {
      kycInputs: {
        permCountry: this.permanentCountry.value,
        permProvince: this.getProvincePerValue(),
        permDistrict: this.getDistrictPerValue(),
        permProvinceId: "not",
        permDistrictId: "not",
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentUpdate(reqPerm).subscribe((data: any) => {
    })
  }
  callAgentTypeAPI() {
    let MMvalue = this.MMacc.value;
    let mmAgent = MMvalue === '1' ? '1' : null;
    let mmUSSD = MMvalue === '2' ? '1' : null;
    let mmStaff = MMvalue === '3' ? '1' : null;
    let mmMicro = MMvalue === '4' ? '1' : null;
    let mmMerchant = MMvalue === '5' ? '1' : null; let reqAgentType = {
      kycInputs: {
        mmAgent: mmAgent,
        mmUSSD: mmUSSD,
        mmStaff: mmStaff,
        mmMicro: mmMicro,
        mmMerchant: mmMerchant,
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentUpdate(reqAgentType).subscribe((data: any) => {
    })
  }
  callOrgAPI() {
    let reqOrg = {
      kycInputs: {
        orgSourceOfIncome: this.incomeSourceOrg.value,
        orgName: this.ShopName.value,
        orgPositionHeld: this.positionorg.value,
        orgAddress: this.address.value,
        orgMonthlyIncome: this.monthlyIncomeorg.value,
        orgTurnover: this.TurnoverOrg.value,
        orgBizNature: this.natureOfBusiness.value,
        orgTinNumber: this.tinOrg.value,
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentUpdate(reqOrg).subscribe((data: any) => {
    })
  }
  callEmiAPI() {
    let emiValue = this.haveOtherAccounts.value;
    let otherMnoYes = emiValue === '1' ? '1' : null;
    let otherMnoNo = emiValue === '2' ? '1' : null;
    let reqMno = {
      kycInputs: {
        otherMnoFacility: this.haveOtherAccounts.value,
        otherMnoName: this.EMIname.value,
        otherMnoAccName: this.accountName.value,
        otherMnoAccNo: this.accountNo.value,
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentUpdate(reqMno).subscribe((data: any) => {
    })
  }
  callKinAPI() {
    let reqKin = {
      kycInputs: {
        nokName: this.nameKin.value,
        nokFatherName: this.fatherKin.value,
        nokRelationship: this.relationship.value,
        nokPhone: this.numberKin.value,
        nokLocation: this.kinAddress.value
      },
      kycType: "AGENT",
      submittedFor: this.submitterForId,
    }
    this.corporate.agentComplete(reqKin, this.submitterForId).subscribe((data: any) => {

    })
  }
  callFinalAPI() {
    this.corporate.addAgentPhoto(this.uploadedImageUser, "agentPhoto", this.submitterForId).subscribe((data: any) => {
      if (data?.responseCode == 200) {
        this.corporate.addAgentDigSign(this.uploadedImageDigSign, "agentSignaturePhoto", this.submitterForId).subscribe((data: any) => {
          if (data?.responseCode == 200) {
            this.corporate.addAgentDocFront(this.uploadedImageDocFront, "custProofFrontPhoto", this.submitterForId).subscribe((data: any) => {
              if (data?.responseCode == 200) {
                this.corporate.addAgentDocBack(this.uploadedImageDocBack, "custProofBackPhoto", this.submitterForId).subscribe((data: any) => {
                  if (data?.responseCode == 200) {
                    this.corporate.addAgentLicense(this.uploadedImageLicense, "bizOrGovtLicensePhoto", this.submitterForId).subscribe((data: any) => {
                      if (data?.responseCode == 200) {
                        this.corporate.addAgentAddressProof(this.uploadedImageAddress, "addressProofPhoto", this.submitterForId).subscribe((data: any) => {
                          if (data?.responseCode == 200) {
                            this.corporate.addAgentTin(this.uploadedImageTin, "tinLetterPhoto", this.submitterForId).subscribe((data: any) => {
                              if (data?.responseCode == 200) {

                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
  submit() {
    let req = {
      // corpUser: {
      agentType: this.accType.value,
      email: this.basicEmail1.value,
      username: this.basicUsername.value,
      firstName: this.basicFirstName.value,
      lastName: this.basicLastName.value,
      phone: this.basicPhone.value,
      userType: 'AGENT',
      gender: this.genderInfo.value,
      // agentType: "CORPORATE",
      // accountType: "CORPORATE",
      password: this.basicPassword.value
      // }
    }
    this.corporate.agentRegister(req).subscribe((data: any) => {
      this.submitterForId = data?.id
      let selectedGender = this.basicGender.value;
      let custInfoMale = selectedGender === '1' ? '1' : "null";
      let custInfoFemale = selectedGender === '2' ? '1' : "null";
      //
      let maritalValue = this.marital.value;
      let custInfoSingle = maritalValue === '1' ? '1' : "null";
      let custInfoMarried = maritalValue === '2' ? '1' : "null";

      let emiValue = this.haveOtherAccounts.value;
      let otherMnoYes = emiValue === '1' ? '1' : null;
      let otherMnoNo = emiValue === '2' ? '1' : null;

      let MMvalue = this.MMacc.value;
      let mmAgent = MMvalue === '1' ? '1' : null;
      let mmUSSD = MMvalue === '2' ? '1' : null;
      let mmStaff = MMvalue === '3' ? '1' : null;
      let mmMicro = MMvalue === '4' ? '1' : null;
      let mmMerchant = MMvalue === '5' ? '1' : null;
      let reqBasic = {
        kycInputs: {
          custInfoFirstName: this.firstName.value,
          custInfoFatherName: this.father.value,
          custInfoPOS: this.pos.value,
          custInfoLastName: this.last.value,
          custInfoTazkira: this.tazkira.value,
          custInfoPositionHeld: this.position.value,
          custInfoDateOfIssue: this.issueDate.value,
          custInfoDob: this.dob.value,
          custInfoCountry: this.country.value,
          custInfoLicenseNo: this.licenseNo.value,
          custInfoICCID: this.ICCID.value,
          custInfoDateOfExpiry: this.expiryDate.value,
          custInfoSourceOfIncome: this.incomeSource.value,
          custInfoPTID: this.PTID.value,
          custInfoMonthlyIncome: this.monthlyIncome.value,
          custInfoPurposeOfAcc: this.accPurpose.value,
          custInfoMarried: custInfoMarried,
          custInfoSingle: custInfoSingle,
          custInfoFemale: custInfoFemale,
          custInfoMale: custInfoMale,
          // custInfoAccOpenDate: this.accountDate.value,
          custInfoEmail: this.basicEmail.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentSubmit(reqBasic).subscribe((data: any) => {
      })
      let reqCurrent = {
        kycInputs: {
          currLocation: this.locationAddress.value,
          currProvince: this.getProvinceCurValue(),
          currStreet: this.streetAddress.value,
          currDistrict: this.getDistrictCurValue(),
          currCountry: this.countryAddress.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentUpdate(reqCurrent).subscribe((data: any) => {
      })
      let reqPerm = {
        kycInputs: {
          permHouseNo: this.permanentHouseNo.value,
          permLocation: this.permanentLocation.value,
          permProvince: this.getProvincePerValue(),
          permStreet: this.permanentStreet.value,
          permDistrict: this.getDistrictPerValue(),
          permCountry: this.permanentCountry.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentUpdate(reqPerm).subscribe((data: any) => {
      })
      let reqAgentType = {
        kycInputs: {
          mmAgent: mmAgent,
          mmUSSD: mmUSSD,
          mmStaff: mmStaff,
          mmMicro: mmMicro,
          mmMerchant: mmMerchant,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentUpdate(reqAgentType).subscribe((data: any) => {
      })
      let reqOrg = {
        kycInputs: {
          orgSourceOfIncome: this.incomeSourceOrg.value,
          orgName: this.ShopName.value,
          orgPositionHeld: this.positionorg.value,
          orgAddress: this.address.value,
          orgMonthlyIncome: this.monthlyIncomeorg.value,
          orgTypeOfActivity: this.activity.value,
          orgTurnover: this.TurnoverOrg.value,
          orgTinNumber: this.tinOrg.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentUpdate(reqOrg).subscribe((data: any) => {
      })
      let reqMno = {
        kycInputs: {
          otherMnoYes: otherMnoYes,
          otherMnoNo: otherMnoNo,
          otherMnoName: this.EMIname.value,
          otherMnoAccName: this.accountName.value,
          otherMnoAccNo: this.accountNo.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentUpdate(reqMno).subscribe((data: any) => {
      })
      let reqKin = {
        kycInputs: {
          nokName: this.nameKin.value,
          nokFatherName: this.fatherKin.value,
          nokMobile: this.numberKin.value,
          nokRelationship: this.relationship.value,
        },
        kycType: "AGENT",
        submittedFor: this.submitterForId,
      }
      this.corporate.agentComplete(reqKin, this.submitterForId).subscribe((data: any) => {
        this.corporate.addAgentphoto(this.uploadedImage, "agentPhoto_img_0", this.photoId).subscribe((data: any) => {
          if (data?.responseCode == 200) {
            this.corporate.addSuperAgentSign(this.uploadedImageUndertaken, "undertakenSign_img_0", this.photoId).subscribe((data: any) => {
              if (data?.responseCode == 200) {

              }
            })
          }
        })
      })
      // undertakenName: this.nameUndertaken.value,
      // undertakenDate: this.dateUndertaken.value,

      this.photoId = data?.data
      console.log("photoId", this.photoId);


    })
  }
}
