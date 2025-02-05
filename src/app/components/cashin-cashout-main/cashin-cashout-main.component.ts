import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashin-cashout-main',
  standalone: true,
  imports: [],
  templateUrl: './cashin-cashout-main.component.html',
  styleUrl: './cashin-cashout-main.component.scss'
})
export class CashinCashoutMainComponent {
  constructor(private route:Router){}
  gotoProductPage(){
    this.route.navigateByUrl('/cashInOut' );
  }
  cashInOut(){
    this.route.navigateByUrl('/withdrawal' );
  }
}
