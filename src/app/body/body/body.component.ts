import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  imports: [RouterOutlet, HomeComponent, CommonModule],
})
export class BodyComponent implements OnInit {
//   isLoggedIn: any;
  constructor(public authService: AuthService) {
   
  }
  ngOnInit(): void {
    //   this.isLoggedIn = sess.getItem('JWT_TOKEN');
  }
}
