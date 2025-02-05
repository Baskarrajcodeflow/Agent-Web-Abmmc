import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './ui-elements/card/card.component';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DataSharingService } from './components/DataSharing/data-sharing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
HeaderComponent,
CardComponent,
LoginComponent,
FooterComponent,
SignupComponent,
CommonModule,
BodyComponent
  ],
})
export class AppComponent {
  showLoginPage: boolean = true;
  constructor(private translate: TranslateService,private dataSharing:DataSharingService) {
    this.translate.setDefaultLang('en');
    // Set the default language
    this.translate.use('en');
  }
  title = 'miPay-b2c';
  showSignup: boolean = false;
  showLogin: boolean = false;
  ngOnInit() {
    this.showLoginPage = !this.dataSharing.login.getValue();
    this.dataSharing.login$.subscribe((res) => {
      this.showLoginPage = !res;
    });
    

    // this.dataSharing.loginSignUp(true)
    //  this.sharedService.showSignupCard$.subscribe(data => {
    //   this.showSignup = data;
    //  })
    //  this.sharedService.showLoginCard$.subscribe(data => {
    //   this.showLogin = data;
    //  })
  }
}
