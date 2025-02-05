import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../ApiService/api.service';
import { DatasharingService } from '../../services/datasharing.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-agent-kyc-registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor,SpinnerComponent],
  templateUrl: './agent-kyc-registration.component.html',
  styleUrl: './agent-kyc-registration.component.css'
})
export class AgentKycRegistrationComponent {

  kycForm:FormGroup;
  typeAgent: any;
  currentPage: number = 1;
  formValues: any;
  nationalities: any;
  provinces: any;
  districts: any;
  provinceId: any;
  selectedProvinceName: any;
  genderValue: any;
  minDate!: string;
  constructor(private fb: FormBuilder, private agentService: ApiService,private spinner:DatasharingService,private router:Router) {
    
    this.kycForm = this.fb.group({
      custInfoFirstName: ['', Validators.required],
      custInfoLastName: ['', Validators.required],
      custInfoFatherName: ['', Validators.required],
      custInfoDob: ['', Validators.required],
      gender: ['1'],
      custInfoCountry: [''],
      custInfoAltPhone: ['', Validators.required],
      custInfoEmail: ['',Validators.email],
      custInfoTazkira: ['', Validators.required],
      currHouseNo: [''],
      currLocation: [''],
      currProvince: [''],
      currStreet: [''],
      currDistrict: [''],
      currCountry: [''],
      occupation: [''],
      salary: [''],
      empName: [''],
      nokName: [''],
      nokMobile: [''],
      nokEmail: ['', Validators.email],
      nokHouseNo: [''],
      nokLocation: [''],
      nokProvince: [''],
      nokStreet: [''],
      nokDistrict: [''],
      nokCountry: [''],
      username:[''],
      orgName: [''],
      orgTypeOfActivity: ['', Validators.required],
      orgSourceOfIncome: ['', Validators.required],
      orgMonthlyIncome: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      orgTurnover: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      orgHouseNo: ['', Validators.required],
      orgLocation: ['', Validators.required],
      orgProvince: ['', Validators.required],
      orgStreet: ['', Validators.required],
      orgDistrict: ['', Validators.required],
      orgCountry: ['', Validators.required],
      orgPhone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      orgEmail: ['', [Validators.required, Validators.email]],
      agentType:'AGENT'
    });
  }
  ngOnInit() {
    this.getCountries();
    this.getDistricts
    this.getProvinces();
    this.setMinDate()
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage--;
    }
  }

  setMinDate() {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
    this.minDate = minDate.toISOString().split('T')[0];
  }
  getCountries(){
    this.agentService.getCountries().subscribe({
      next: (data: any) => {
        this.nationalities = data?.data;        
      }
    });
   }

   dataChanged(event:any){
    console.log(event);
    if(event == 'Afghanistan'){
    }
   }
   getProvinces(){
    this.agentService.getprovinces().subscribe({
      next: (data: any) => {
        this.provinces = data?.data;     
      }
    });
   }
   
   getDistricts(provinceId:number){
    this.agentService.getdistricts(provinceId).subscribe({
      next: (data: any) => {
        this.districts = data?.data;        
      }
    });
   }

  onSelectProvince($event:any){
    this.provinceId = $event.target.value;
    const filteredProvinces = this.provinces.filter((province: any) => province.name === this.provinceId);
        if (filteredProvinces && filteredProvinces.length > 0) {
          this.selectedProvinceName = filteredProvinces[0].id;
        }
     this.getDistricts(this.selectedProvinceName);  
    }


  onGenderChange($event: any) {
    this.genderValue = $event.target.value;
    if (this.genderValue === '1') { 
      this.kycForm.removeControl('custInfoFemale');
      this.kycForm.addControl('custInfoMale', this.fb.control('1'));
    } else if (this.genderValue === '2') { 
      this.kycForm.removeControl('custInfoMale');
      this.kycForm.addControl('custInfoFemale', this.fb.control('1'));
    } else {
      this.kycForm.removeControl('custInfoMale');
      this.kycForm.removeControl('custInfoFemale');
    }
    this.kycForm.removeControl('gender');
  }
  
  onSave() {
    let userId = sessionStorage.getItem('UserId');
    const formValue = this.kycForm.value;
    let req  = {
      kycInputs:formValue,
      kycType: "AGENT"
    }
this.spinner.show()
    this.agentService.postKycDetails(req).subscribe({
      next : (data:any) =>{
        if(data?.responseCode == 200){
          if (this.fileToUpload) {
            this.agentPhoto_img_0 = new FormData();
            this.agentPhoto_img_0.append('file', this.fileToUpload, this.fileToUpload.name);
            this.agentService.kycProofUpload(this.agentPhoto_img_0, 'agentPhoto_img_0', userId).subscribe((res)=>{
              if(res?.responseCode == 200){
                if (this.signaturefileToUpload) {
                  this.undertakenSign_img_0 = new FormData();
                  this.undertakenSign_img_0.append('file', this.signaturefileToUpload, this.signaturefileToUpload.name);
                  this.agentService.kycProofUpload(this.undertakenSign_img_0, 'undertakenSign_img_0', userId).subscribe((res)=>{
                    if(res?.responseCode == 200){
                      if (this.bizFrontfileToUpload) {
                        this.biz_license_front = new FormData();
                        this.biz_license_front.append('file', this.bizFrontfileToUpload, this.bizFrontfileToUpload.name);
                        this.agentService.kycProofUpload(this.biz_license_front, 'biz_license_front', userId).subscribe((res)=>{
                          if(res?.responseCode == 200){
                            if (this.bizBackfileToUpload) {
                              this.biz_license_back = new FormData();
                              this.biz_license_back.append('file', this.bizBackfileToUpload, this.bizBackfileToUpload.name);
                              this.agentService.kycProofUpload(this.biz_license_back, 'biz_license_back', userId).subscribe((res)=>{
                                if(res?.responseCode == 200){
    this.spinner.hide()
    alert('Agent KYC Details Submitted Sccessfully')
    this.router.navigateByUrl('/dashboard')
                                }else{
                                  alert(res?.error)
                                }
                              })
                            } else {
                              console.error('No file selected');
                            }
                          }else{
                            alert(res?.error)
                          }
                        })
                      } else {
                        console.error('No file selected');
                      }
                    }else{
                      alert(res?.error)
                    }
                  })
                }
              }
            })
          }
          alert("Agent Kyc Registration successfull")
        }else{
          alert(data?.error)
        }
       
      }
    })
  }
  onCancel(){

  }

  
  agentPhoto_img_0:any
  undertakenSign_img_0:any
  biz_license_front:any
  biz_license_back:any
fileToUpload!: File;
imageUrl: any;

handleFileInput(file: any) {
  this.fileToUpload = file.files.item(0);

  // Show image preview
  let reader = new FileReader();
  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };
  reader.readAsDataURL(this.fileToUpload);



}


  signaturefileToUpload!: File;
  signatureimageUrl: any;
  signatureHandleFileInput(file: any) {
    this.signaturefileToUpload = file.files.item(0);

  let reader = new FileReader();
  reader.onload = (e: any) => {
    this.signatureimageUrl = e.target.result;
  };
  reader.readAsDataURL(this.signaturefileToUpload);
   
  }

  bizFrontfileToUpload!: File;
  bizFrontimageUrl: any;
  bizFronthandleFileInput(file: any) {
    this.bizFrontfileToUpload = file.files.item(0);
    let reader = new FileReader();
  reader.onload = (e: any) => {
    this.bizFrontimageUrl = e.target.result;
  };
  reader.readAsDataURL(this.bizFrontfileToUpload);
 
  }

  bizBackfileToUpload!: File;
  bizBackimageUrl: any;
  bizBackhandleFileInput(file: any) {
    this.bizBackfileToUpload = file.files.item(0);
    let reader = new FileReader();
  reader.onload = (e: any) => {
    this.bizBackimageUrl = e.target.result;
  };
  reader.readAsDataURL(this.bizBackfileToUpload);
  
  }

}