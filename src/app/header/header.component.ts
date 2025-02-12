import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../components/DataSharing/data-sharing.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
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
  constructor(private sharedService : SharedService, public authService : AuthService,private router:Router,
    private data:DataSharingService
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

ngOnInit(): void {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    this.loginData = sessionStorage.getItem('JWT_TOKEN')
  }
    
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
  

}
showDropdownMenu(){
  this.showDropdown = !this.showDropdown

}

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

getWalletBalance(){
  return this.sharedService.walletBalance
}
navigate(nav:any){
  this.router.navigateByUrl(nav)
  this.isDropdownOpen = false
}
  


}
