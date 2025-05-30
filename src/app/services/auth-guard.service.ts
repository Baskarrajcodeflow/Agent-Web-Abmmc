import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
}) 
export class AuthGuardService implements CanActivate {

  constructor( private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
