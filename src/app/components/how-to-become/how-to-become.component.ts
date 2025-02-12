import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../ApiService/api.service';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../DataSharing/data-sharing.service';

@Component({
  selector: 'app-how-to-become',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './how-to-become.component.html',
  styleUrl: './how-to-become.component.scss'
})
export class HowToBecomeComponent {
  @Output() cancel = new EventEmitter<void>();
  public corporateForm: FormGroup = new FormGroup({});

  public firstName: FormControl = new FormControl('', [Validators.required]);
  public father: FormControl = new FormControl('', [Validators.required]);
  public pos: FormControl = new FormControl('', [Validators.required]);
  public last: FormControl = new FormControl('', [Validators.required]);
  public tazkira: FormControl = new FormControl('', [Validators.required]);
  public position: FormControl = new FormControl('', [Validators.required]);
  public issueDate: FormControl = new FormControl('', [Validators.required]);
  public dob: FormControl = new FormControl('');
  public country: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public licenseNo: FormControl = new FormControl('', [Validators.required]);
  public ICCID: FormControl = new FormControl('', [Validators.required]);
  public expiryDate: FormControl = new FormControl('', [Validators.required]);
  public incomeSource: FormControl = new FormControl('', [Validators.required]);
  public PTID: FormControl = new FormControl('');
  public monthlyIncome: FormControl = new FormControl('', [Validators.required]);
  public accPurpose: FormControl = new FormControl('', [Validators.required]);
  public marital: FormControl = new FormControl('', [Validators.required]);
  public basicGender: FormControl = new FormControl('', [Validators.required]);
  public accountDate: FormControl = new FormControl('', [Validators.required]);
  public basicEmail: FormControl = new FormControl('');

  public houseNoAddress: FormControl = new FormControl('', [Validators.required]);
  public locationAddress: FormControl = new FormControl('', [Validators.required]);
  public countryAddress: FormControl = new FormControl('', [Validators.required]);
  public provinceAddress: FormControl = new FormControl('', [Validators.required]);
  public districtAddress: FormControl = new FormControl('', [Validators.required]);
  public streetAddress: FormControl = new FormControl('', [Validators.required]);

  public permanentHouseNo: FormControl = new FormControl('', [Validators.required]);
  public permanentLocation: FormControl = new FormControl('', [Validators.required]);
  public permanentCountry: FormControl = new FormControl('', [Validators.required]);
  public permanentProvince: FormControl = new FormControl('', [Validators.required]);
  public permanentDistrict: FormControl = new FormControl('', [Validators.required]);
  public permanentStreet: FormControl = new FormControl('', [Validators.required]);


  public MMacc: FormControl = new FormControl('', [Validators.required]);

  public incomeSourceOrg: FormControl = new FormControl('');
  public ShopName: FormControl = new FormControl('', [Validators.required]);
  public positionorg: FormControl = new FormControl('', [Validators.required]);
  public address: FormControl = new FormControl('', [Validators.required]);
  public monthlyIncomeorg: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  public activity: FormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  public TurnoverOrg: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  public tinOrg: FormControl = new FormControl('');

  public haveOtherAccounts: FormControl = new FormControl('');
  public MNOname: FormControl = new FormControl('', [Validators.required]);
  public accountName: FormControl = new FormControl('', [Validators.required]);
  public accountNo: FormControl = new FormControl('AFN  ', [Validators.required]);

  public fatherKin: FormControl = new FormControl('AFN  ', [Validators.required]);
  public nameKin: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]);
  public numberKin: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]);
  public relationship: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)]);

  public nameUndertaken: FormControl = new FormControl('', [Validators.required]);
  public dateUndertaken: FormControl = new FormControl('');

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
  agents: any;
  agentType: any;

constructor(private router:Router,private agentService: ApiService,

  private dataSharing:DataSharingService
){
 this.dataSharing.agentType$.subscribe((res)=>{
  this.agentType = res
})
this.agentType = sessionStorage.getItem('agentType')
}
ngOnInit(): void {
  this.initForm();
  this.getCountries();
  this.getDistricts
  this.getProvinces();
this.getCorporateUsers();
}
getCorporateUsers() {
  this.agentService.getSubAgent().subscribe((data: any) => {
    this.agents = data
  })
}
private initForm() {
  this.corporateForm.addControl('firstName', this.firstName);
  this.corporateForm.addControl('father', this.father);
  this.corporateForm.addControl('pos', this.pos);
  this.corporateForm.addControl('last', this.last);
  this.corporateForm.addControl('tazkira', this.tazkira);
  this.corporateForm.addControl('position', this.position);
  this.corporateForm.addControl('issueDate', this.issueDate);
  this.corporateForm.addControl('dob', this.dob);
  this.corporateForm.addControl('country', this.country);
  this.corporateForm.addControl('licenseNo', this.licenseNo);
  this.corporateForm.addControl('ICCID', this.ICCID);
  this.corporateForm.addControl('expiryDate', this.expiryDate);
  this.corporateForm.addControl('incomeSource', this.incomeSource);
  this.corporateForm.addControl('PTID', this.PTID);
  this.corporateForm.addControl('monthlyIncome', this.monthlyIncome);
  this.corporateForm.addControl('accPurpose', this.accPurpose);
  this.corporateForm.addControl('marital', this.marital)
  this.corporateForm.addControl('basicGender', this.basicGender);
  this.corporateForm.addControl('accountDate', this.accountDate);
  this.corporateForm.addControl('basicEmail', this.basicEmail);


  this.corporateForm.addControl('houseNoAddress', this.houseNoAddress);
  this.corporateForm.addControl('locationAddress', this.locationAddress);
  this.corporateForm.addControl('provinceAddress', this.provinceAddress);
  this.corporateForm.addControl('streetAddress', this.streetAddress);
  this.corporateForm.addControl('districtAddress', this.districtAddress);
  this.corporateForm.addControl('countryAddress', this.countryAddress);

  this.corporateForm.addControl('permanentHouseNo', this.permanentHouseNo);
  this.corporateForm.addControl('permanentLocation', this.permanentLocation);
  this.corporateForm.addControl('permanentProvince', this.permanentProvince);
  this.corporateForm.addControl('permanentStreet', this.permanentStreet);
  this.corporateForm.addControl('permanentDistrict', this.permanentDistrict);
  this.corporateForm.addControl('permanentCountry', this.permanentCountry);

  this.corporateForm.addControl('MMacc', this.MMacc);

  this.corporateForm.addControl('incomeSourceOrg', this.incomeSourceOrg);
  this.corporateForm.addControl('ShopName', this.ShopName);
  this.corporateForm.addControl('positionorg', this.positionorg);
  this.corporateForm.addControl('address', this.address);
  this.corporateForm.addControl('monthlyIncomeorg', this.monthlyIncomeorg);
  this.corporateForm.addControl('activity', this.activity);
  this.corporateForm.addControl('TurnoverOrg', this.TurnoverOrg);
  this.corporateForm.addControl('tinOrg', this.tinOrg);

  this.corporateForm.addControl('haveOtherAccounts', this.haveOtherAccounts);
  this.corporateForm.addControl('MNOname', this.MNOname);
  this.corporateForm.addControl('accountName', this.accountName);
  this.corporateForm.addControl('accountNo', this.accountNo);

  this.corporateForm.addControl('VicecountryAddress', this.fatherKin);
  this.corporateForm.addControl('nameKin', this.nameKin);
  this.corporateForm.addControl('numberKin', this.numberKin);
  this.corporateForm.addControl('relationship', this.relationship);
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

}
//new
isCurrentPageValid(): boolean {
  switch (this.currentPage) {
    // case 1:
    //   return this.basicFirstName.value &&
    //     this.basicLastName.value &&
    //     this.basicEmail.value &&
    //     this.basicPhone.value &&
    //     this.basicGender.value &&
    //     this.basicUsername.value &&
    //     this.basicPassword.value;
    case 1:
      return this.firstName.value &&
        this.father.value &&
        this.pos.value &&
        this.last.value &&
        this.tazkira.value &&
        this.position.value &&
        this.issueDate.value &&
        this.dob.value &&

        this.country.value &&
        this.licenseNo.value &&
        this.ICCID.value &&
        this.expiryDate.value &&
        this.incomeSource.value &&

        this.PTID.value &&
        this.monthlyIncome.value &&
        this.accPurpose.value &&
        this.marital.value &&
        this.basicGender.value &&
        this.accountDate.value &&
        this.basicEmail.value;
    case 2:
      return this.locationAddress.value &&
        this.provinceAddress.value &&
        this.districtAddress.value &&
        this.countryAddress.value;
    case 3:
      return this.locationAddress.value &&
        this.provinceAddress.value &&
        this.districtAddress.value &&
        this.countryAddress.value;
    case 4:
      return this.MMacc.value;
    case 5:
      return this.incomeSourceOrg.value &&
        this.ShopName.value &&
        this.address.value &&
        this.monthlyIncomeorg.value &&
        this.activity.value &&
        this.TurnoverOrg.value &&
        this.tinOrg.value;

    case 6:
      return this.haveOtherAccounts.value;

    case 7:
      return this.nameKin.value &&
        this.fatherKin.value &&
        this.numberKin.value &&
        this.relationship.value;
    case 8:
      return this.nameUndertaken.value &&
        this.dateUndertaken.value;
    // this.issueDate.value &&
    // this.expiryDate.value;
    default:
      return false;
  }
}
//new
nextPage() {
  // if (this.corporateForm.valid) {
  this.currentPage++;
  // }
}

previousPage() {
  if (this.currentPage !== 1) {
    this.currentPage--;
  }
}

getCountries() {
  this.agentService.getCountries().subscribe({
    next: (data: any) => {
      this.nationalities = data?.data;
    }
  });
}

getProvinces() {
  this.agentService.getprovinces().subscribe({
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
  this.agentService.getdistricts(provinceId).subscribe({
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
detectFilesUndertaken(event: any) {
  if (event.target.files && event.target.files[0]) {
    this.uploadedImageUndertaken = event.target.files[0];
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

}
detectFilesAuth(event: any) {
  if (event.target.files && event.target.files[0]) {
    this.uploadedImageAuth = event.target.files[0];
    // this.uploadedImageFileName = event.target.files[0].name;
    // this.uploadedImageFileType = event.target.files[0].type
    // this.uploadedImageFileNameExtension = event.target.files[0].name.split('.').pop();
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // this.uploadedImageFileData = reader.result;
    // reader.onload = () => {
    //   this.uploadedImageFileData = reader.result;
    // };
  }

}
detectFilesPresident(event: any) {
  if (event.target.files && event.target.files[0]) {
    this.uploadedImagePres = event.target.files[0];
    // this.uploadedImageFileName = event.target.files[0].name;
    // this.uploadedImageFileType = event.target.files[0].type
    // this.uploadedImageFileNameExtension = event.target.files[0].name.split('.').pop();
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // this.uploadedImageFileData = reader.result;
    // reader.onload = () => {
    //   this.uploadedImageFileData = reader.result;
    // };
  }

}
onCancel() {
  this.cancel.emit();
}

submit() {

  let req = {
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
      // "custInfoMarried",
      // "custInfoSingle",
      // "custInfoFemale",
      // "custInfoMale",
      custInfoMarried: this.marital.value,
      custInfoFemale: this.basicGender.value,
      custInfoAccOpenDate: this.accountDate.value,
      custInfoEmail: this.basicEmail.value,

      permHouseNo: this.permanentHouseNo.value,
      permLocation: this.permanentLocation.value,
      permProvince: this.permanentProvince.value,
      permStreet: this.permanentStreet.value,
      permDistrict: this.permanentDistrict.value,
      permCountry: this.permanentCountry.value,

      currHouseNo: this.houseNoAddress.value,
      currLocation: this.locationAddress.value,
      currProvince: this.provinceAddress.value,
      currStreet: this.streetAddress.value,
      currDistrict: this.districtAddress.value,
      currCountry: this.countryAddress.value,

      orgSourceOfIncome: this.incomeSourceOrg.value,
      orgName: this.ShopName.value,
      orgPositionHeld: this.positionorg.value,
      orgAddress: this.address.value,
      orgMonthlyIncome: this.monthlyIncomeorg.value,
      orgTypeOfActivity: this.activity.value,
      orgTurnover: this.TurnoverOrg.value,
      orgTinNumber: this.tinOrg.value,

      otherMnoNo: this.haveOtherAccounts.value,
      otherMnoName: this.MNOname.value,
      otherMnoAccName: this.accountName.value,
      otherMnoAccNo: this.accountNo.value,

      nokName: this.nameKin.value,
      nokFatherName: this.fatherKin.value,
      nokMobile: this.numberKin.value,
      nokRelationship: this.relationship.value,

      undertakenName: this.nameUndertaken.value,
      undertakenDate: this.dateUndertaken.value,
    },

  }

  console.log(req?.kycInputs);

 /*  this.corporate.agentRegister(req).subscribe((data: any) => {
    this.photoId = data?.data
    console.log("photoId", this.photoId);

    if (data?.responseCode == 200) {
      alert("success")
    }
    else {
      alert("failed")
    }
    // superPhoto_img_0: "",
    // prezSign_img_1: "",
    // vicePrezSign_img_1: "",
    // processedBySign_img_2: "",
    // opsSign_img_2: "",
    // complianceSign_img_2: "",
    // authPersonSign_img_1: "",

    this.corporate.addSuperAgentPhoto(this.uploadedImage, "agentPhoto_img_0", this.photoId).subscribe((data: any) => {
      if (data?.responseCode == 200) {
        this.corporate.addSuperAgentSign(this.uploadedImageUndertaken, "undertakenSign_img_0", this.photoId).subscribe((data: any) => {
          if (data?.responseCode == 200) {
            // this.corporate.addSuperAgentSign(this.uploadedImageVice, "vicePrezSign_img_1", this.photoId).subscribe((data: any) => {
            //   if (data?.responseCode == 200) {
            //     alert("File Upload success")
            //     // this.corporate.addSuperAgentSign(this.uploadedImage, "processedBySign_img_2", this.photoId).subscribe((data: any) => {
            //     //   if (data?.response == 200) {
            //     //     this.corporate.addSuperAgentSign(this.uploadedImage, "opsSign_img_2", this.photoId).subscribe((data: any) => {
            //     //       if (data?.response == 200) {
            //     //         this.corporate.addSuperAgentSign(this.uploadedImage, "complianceSign_img_2", this.photoId).subscribe((data: any) => {

            //     //         })
            //     //       }
            //     //     })
            //     //   }
            //     // })
            //   }
            // })
          }
        })
      }
    })

  }) */
}


navigate(nav:any){
this.router.navigateByUrl(nav)
}
}
