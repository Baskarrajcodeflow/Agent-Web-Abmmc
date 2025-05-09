import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../components/DataSharing/data-sharing.service';
import { environment } from '../../environments/environment';
import { ApiService } from '../ApiService/api.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from "../components/loader/loader.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule, LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  loggedIn : boolean = false;
  showHeader: boolean =false;
  kycCmomplete:any;
  showHeaderData: any = false
  kycTemplate: any;
  loginData: any;
  loginData2: any;
currPwd: any;
newPwd: any;
confirmPwd: any;
showCurrPwd: boolean = false;
  constructor(private sharedService : SharedService, public authService : AuthService,private router:Router,
    private data:DataSharingService,
    private apiService: ApiService,
  ){
  this.data.setheader$.subscribe((res)=>{
    this.showHeader = res
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.showHeaderData = sessionStorage.getItem('header')
    }
    this.loginData2 = res
  })
  this.data.kyc$.subscribe((res:any)=>{
    console.log(res);
    if(res){
      this.kycCmomplete = res?.accountKycLevel;
      
    }
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('KycLevel',res?.accountKycLevel)
      this.kycTemplate = sessionStorage.getItem('KycLevel')
      console.log(this.kycTemplate);
    }
  })

}
changePwd:boolean = false
imageUrl = environment.apiUrl;
img: any;
firstName:any
lastName:any
email:any
phone:any
type:any
ngOnInit(): void {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    this.loginData = sessionStorage.getItem('JWT_TOKEN')
    this.img = sessionStorage.getItem('profileimg');

  }
  this.data.profilepic$.subscribe((res) => {
    if (res) {
      this.img = res;
    }
  });
   
  this.data.walletNo$.subscribe((res:any)=>{
    this.firstName = res?.firstName
    this.lastName = res?.lastName
    this.email = res?.email
    this.phone = res?.phone
    this.type = res?.userType
    this.img = res?.profilePic;
  })
  
  this.firstName = sessionStorage.getItem('firstname')
  this.lastName = sessionStorage.getItem('lastname')
  this.email = sessionStorage.getItem('email')
  this.phone = sessionStorage.getItem('phoneno')
  this.type = sessionStorage.getItem('userType')
  this.img = sessionStorage.getItem('profileimg');

}
 /* showHeaderProfile() : boolean {
  this.authService.isLoggedIn.subscribe(data => {
   alert(data)
    this.loggedIn = data;
    return this.loggedIn;
  })
  return false;
} */
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
switchLanguage(arg0: string) {
throw new Error('Method not implemented.');
}
showWallet: boolean = false;
showUser: boolean = false;
showDropdown: boolean = false;



showDropdownWallet(){
  this.showWallet = !this.showWallet
  this.showDropdown = this.showUser = false;


  //return (this.showDropdown);
  

}
showDropdownUser(){
  this.showUser = !this.showUser
  this.showDropdown = this.showWallet = false;
  //return (this.showDropdown);
  this.changePwd = false
  this.currPwd = null
  this.newPwd = null
  this.confirmPwd = null

}
showDropdownMenu(){
  this.showDropdown = !this.showDropdown

}
showNewPwd: boolean = false;
showConfirmPwd: boolean = false;


gotoSignup(){
    this.sharedService.toggleSignUp();
}
gotoLogin(){
  this.data.setloginData(true)

}
logout(){
  sessionStorage.clear()
  setTimeout(() => {
    window.location.reload()
  }, 50);
}
getuserName(){ 
      return this.sharedService.userName;
}
changePass(){
  this.changePwd = true
}
isLoading: boolean = false;

changePwdData(){


  let data={
    oldPassword:this.currPwd,
    newPassword:this.newPwd,
    userType:'AGENT',
  }
  console.log(data);
  
this.isLoading = true
  this.apiService.ChangePinRequest(data).subscribe({
    next: (res) => {
      if (res?.responseCode == 200) {
        alert('Password Updated Successfully')
        this.isLoading = false;
        this.changePwd = false
        this.currPwd = null
        this.newPwd = null
        this.confirmPwd = null
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
}
change(){
  this.changePwd = false
  this.currPwd = null
  this.newPwd = null
  this.confirmPwd = null
}
getWalletBalance(){
  return this.sharedService.walletBalance
}
validateNumberInput(event: KeyboardEvent) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
navigate(nav:any){
  this.router.navigateByUrl(nav)
  this.isDropdownOpen = false
}
showProfile = false
toggleProfileDropdown() {
  this.showProfile = !this.showProfile;
}



file1!: File;
errorMessage: string | null = null;

onFileSelectedForProfile(event: any) {
  //const input = event.target as HTMLInputElement;
  if (event.target.files[0]) {
    const file = event.target.files[0];
    this.file1 = file;
  }

  const input = event.target as HTMLInputElement;
       
  if (input?.files?.length) {
    const file = input.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!validTypes.includes(file.type)) {
      console.warn('Invalid file type selected:', file.type);
      this.errorMessage = 'Invalid file type. Please select a valid image'
      input.value = ''; 
    } else {
      console.log('Valid file selected:', file.name);
      this.apiService.submitCorporateProfilePic(this.file1)
      .subscribe((res) => {
        console.log(res);
        if (res?.responseCode == 200) {
            this.showUser = false;
            alert('Profile Picture Changed');
            this.apiService.getUserProfile().subscribe({
              next: (res) => {
                this.img = res?.data?.profilePic;
                this.data.setprofilepicData(res?.data?.profilePic);
              },
              error: () => {
                alert('Error Try Again');
              },
            });
          }else{
            alert(res?.error)
          }
        });
    }
  }
}


}
