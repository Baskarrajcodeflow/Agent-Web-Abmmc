import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurServicesComponent } from '../Our-Services/our-services.component';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { DataSharingService } from '../DataSharing/data-sharing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OurServicesComponent, LoginComponent, SignupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
showLoginPart:boolean = false
constructor(private cdr: ChangeDetectorRef,
  private data:DataSharingService
) {
  data.loginUrl$.subscribe((res)=>{
    this.showLoginPart = res
  })
}
  images: string[] = [
    'https://via.placeholder.com/1200x500',
    'https://via.placeholder.com/1200x500',
    'https://via.placeholder.com/1200x500'
  ];

  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  showLogin(){
   this.showLoginPart = true
   this.cdr.detectChanges();
   console.log(this.showLoginPart);
   
  }
}
