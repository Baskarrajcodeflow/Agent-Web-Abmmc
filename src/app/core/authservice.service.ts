import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  private readonly JWT_TOKEN = "JWT_TOKEN";
  token!: string;

  constructor(private apiService:ApiService) { }
  endpoint: string = "";
  currentUser = signal<string>("");

  login(username: string, password: string): Observable<any> {
      this.endpoint = "/aaa/agent/login";

    return this.apiService.post(this.endpoint, { username, password }).pipe(
      tap((response: any) => {
        // let tokens = JSON.stringify(response);
        this.doLoginUser(username, response.token);
      })
    );
  }
  doLoginUser(userName: string, tokens: any) {
    this.currentUser.set(userName);
    this.storeToken(tokens);
    // this.router.navigate(["/CustomerComponent"]);
  }
  storeToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
    this.token = jwt;
  }
}
