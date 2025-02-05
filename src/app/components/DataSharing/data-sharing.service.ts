import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  
  private setCondition = new BehaviorSubject<boolean>(false);
  setCondition$ = this.setCondition.asObservable();

  setConditionSignUp(event:any) {
    this.setCondition.next(event);
  }

  private setheader = new BehaviorSubject<boolean>(false);
  setheader$ = this.setheader.asObservable();

  setheaderSignUp(event:any) {
    this.setheader.next(event);
  }
    
  private kyc = new BehaviorSubject<boolean>(false);
  kyc$ = this.kyc.asObservable();

  kycSignUp(event:any) {
    this.kyc.next(event);
  }

  private currentBalance = new BehaviorSubject<boolean>(false);
  currentBalance$ = this.currentBalance.asObservable();

  currentBalanceData(event:any) {
    this.currentBalance.next(event);
  }

  
  private loginUrl = new BehaviorSubject<any>(null);
  loginUrl$ = this.loginUrl.asObservable();

  setloginData(operator: any) {
    this.loginUrl.next(operator);
    
  }

  public login = new BehaviorSubject<boolean>(false);
  login$ = this.login.asObservable();
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const savedState = sessionStorage.getItem('isLoggedIn');
      if (savedState) {
        this.login.next(JSON.parse(savedState));
      }
    }
  }

  loginSignUp(isLoggedIn: boolean) {
    if (this.isBrowser) {
      this.login.next(isLoggedIn);
      sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }
  }
}
